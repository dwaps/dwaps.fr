import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

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
  cubes: THREE.Mesh[] = [];
  textureLoader!: THREE.TextureLoader;

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
      1000
    );
    this.camera.lookAt(0, 0, 0);
    this.camera.position.z += 500;
    this.scene.add(this.camera);
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

    // Cubes
    const geometry = new THREE.BoxGeometry();
    this.cubes.push(
      new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ map: githubTexture })
      ),
      new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ map: linkedinTexture })
      )
    );
    this.cubes[0].name = 'github';
    this.cubes[0].position.x -= 250;
    this.cubes[1].name = 'linkedin';
    this.cubes[1].position.x += 250;
    this.cubes.forEach((c) => c.scale.set(230, 230, 230));

    loadingManager.onLoad = () => {
      this.cubes.forEach((c) => this.scene.add(c));
      this.animate();
    };
  }

  animate() {
    const delta = this.clock.getDelta();
    this.cubes.forEach((c, i) => {
      c.rotation.y += (i % 2 ? -0.8 : 1) * delta;
      c.rotation.z += (i % 2 ? 0.9 : -1) * delta;
    });
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}
