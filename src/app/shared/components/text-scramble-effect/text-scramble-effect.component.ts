import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-text-scramble-effect',
  standalone: true,
  imports: [],
  templateUrl: './text-scramble-effect.component.html',
  styleUrl: './text-scramble-effect.component.scss',
})
export class TextScrambleEffectComponent implements AfterViewInit {
  @ViewChild('text') el?: ElementRef<HTMLDivElement>;
  @ContentChildren('text') content?: QueryList<
    ElementRef<HTMLParagraphElement>
  >;

  chars: string = '!<>-_\\/[]{}—=+*^?#________';

  counter = 0;
  resolve: any;
  frameRequest: any;
  queue: any[] = [];
  frame: any;

  constructor() {
    this.update = this.update.bind(this);
  }

  ngAfterViewInit(): void {
    this.next();
  }

  next() {
    if (this.content) {
      this.setText(
        this.content.get(this.counter)?.nativeElement.innerText
      )?.then(() => {
        setTimeout(() => this.next(), Math.ceil(Math.random() * 2000) + 1000);
      });
      this.counter = (this.counter + 1) % this.content.toArray().length;
    }
  }

  setText(newText?: string) {
    if (newText && this.el) {
      const oldText = this.el.nativeElement.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    return null;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    if (this.el) {
      this.el.nativeElement.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
