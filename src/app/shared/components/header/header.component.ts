import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

const INDEX_X = 0;
const INDEX_Y = 1;
const INDEX_Z = 2;

const INDEX_CUBE_1 = 0;
const INDEX_CUBE_2 = 1;

interface MeshConfig {
  initialScale: [x: number, y: number, z: number];
  maxScale: [x: number, y: number, z: number];
  minScale: [x: number, y: number, z: number];
  initialPosition: [x: number, y: number, z: number];
  unselectedPosition: [x: number, y: number, z: number];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas?: ElementRef<HTMLCanvasElement>;

  clock!: THREE.Clock;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  cubes!: [THREE.Mesh, THREE.Mesh];
  cubesConfig!: MeshConfig;
  textureLoader!: THREE.TextureLoader;

  raycaster!: THREE.Raycaster;
  pointer!: THREE.Vector2;

  ngAfterViewInit(): void {
    this.clock = new THREE.Clock();
    this.textureLoader = new THREE.TextureLoader();
    this.configRenderer();
    this.scene = new THREE.Scene();
    this.configCamera();
    this.configCubesAndLaunchAnimation();
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas?.nativeElement,
      alpha: true,
    });
    this.renderer.setSize(innerWidth / 4, 100);
    this.renderer.setPixelRatio(devicePixelRatio);
  }

  configCamera() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      innerWidth / 4 / 100,
      0.1,
      1200
    );
    this.camera.lookAt(0, 0, 0);
    this.camera.position.z += 750;
    this.scene.add(this.camera);
  }

  onPointerMove(event: PointerEvent) {
    this.pointer.x = (event.clientX / innerWidth) * 2 - 1;
    this.pointer.y = (event.clientY / innerHeight) * 2 + 1;

    const updateMesh = (cube1: THREE.Mesh, cube2: THREE.Mesh) => {
      cube1.scale.set(...this.cubesConfig.minScale);
      cube2.scale.set(...this.cubesConfig.maxScale);

      if (cube1 == this.cubes[INDEX_CUBE_1]) {
        cube1.position.x = -this.cubesConfig.initialPosition[INDEX_X];
        cube1.position.x += 10;
      } else {
        cube1.position.x = this.cubesConfig.initialPosition[INDEX_X];
        cube1.position.x -= 10;
      }
      (<THREE.MeshMatcapMaterial>cube2.material).color.set(0x40dbbe);
      (<THREE.MeshMatcapMaterial>cube1.material).color.set(0x333333);
    };

    if (this.pointer.x < 0) {
      updateMesh(this.cubes[INDEX_CUBE_2], this.cubes[INDEX_CUBE_1]);
    } else {
      updateMesh(this.cubes[INDEX_CUBE_1], this.cubes[INDEX_CUBE_2]);
    }
  }

  onClick(event: MouseEvent) {
    this.pointer.x = (event.clientX / innerWidth) * 2 - 1;
    this.pointer.y = (event.clientY / innerHeight) * 2 + 1;
    console.log('yeah');
  }

  onMouseLeave() {
    this.cubes[INDEX_CUBE_1].position.x =
      -this.cubesConfig.initialPosition[INDEX_X];
    this.cubes[INDEX_CUBE_2].position.x =
      this.cubesConfig.unselectedPosition[INDEX_X];
    (<THREE.MeshMatcapMaterial>this.cubes[INDEX_CUBE_1].material).color.set(
      0xffffff
    );
    (<THREE.MeshMatcapMaterial>this.cubes[INDEX_CUBE_2].material).color.set(
      0xffffff
    );
    this.cubes.forEach((c) => c.scale.set(...this.cubesConfig.initialScale));
  }

  configCubesAndLaunchAnimation() {
    const loadingManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(loadingManager);

    const githubTexture = this.textureLoader.load(
      'assets/images/logo-github.png'
    );
    const linkedinTexture = this.textureLoader.load(
      'assets/images/logo-linkedin.png'
    );

    githubTexture.magFilter = THREE.NearestFilter;
    linkedinTexture.magFilter = THREE.NearestFilter;

    // Events
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // Cubes
    const geometry = new THREE.BoxGeometry();
    this.cubes = [
      new THREE.Mesh(
        geometry,
        new THREE.MeshMatcapMaterial({
          map: githubTexture,
        })
      ),
      new THREE.Mesh(
        geometry,
        new THREE.MeshMatcapMaterial({
          map: linkedinTexture,
        })
      ),
    ];
    this.cubesConfig = {
      initialScale: [230, 230, 230],
      maxScale: [300, 300, 300],
      minScale: [200, 200, 200],
      initialPosition: [300, 0, 0],
      unselectedPosition: [300, 0, 0],
    };
    this.cubes[INDEX_CUBE_1].name = 'github';
    this.cubes[INDEX_CUBE_1].position.x =
      -this.cubesConfig.initialPosition[INDEX_X];
    this.cubes[INDEX_CUBE_2].name = 'linkedin';
    this.cubes[INDEX_CUBE_2].position.x =
      this.cubesConfig.unselectedPosition[INDEX_X];
    this.cubes.forEach((c) => c.scale.set(...this.cubesConfig.initialScale));

    // Loading texture and launching animation
    loadingManager.onLoad = () => {
      this.cubes.forEach((c) => this.scene.add(c));
      this.animate();
    };
  }

  animate() {
    const delta = this.clock.getDelta();

    this.cubes.forEach((c, i) => {
      if (i < 2) {
        c.rotation.y += (i % 2 ? -0.8 : 1) * delta;
        c.rotation.z += (i % 2 ? 0.9 : -1) * delta;
      }
    });

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.cubes);
    // console.log(intersects);
    // for (let mesh of intersects) {
    //   console.log(mesh);
    // }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}
