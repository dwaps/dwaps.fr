import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { BackgroundComponent } from './shared/components/background/background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
