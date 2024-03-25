import { Component, ViewEncapsulation } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { BackgroundComponent } from './shared/components/background/background.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundComponent, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
