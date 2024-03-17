import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TextScrambleEffectComponent } from '../../shared/text-scramble-effect/text-scramble-effect.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextScrambleEffectComponent, NgForOf, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  textToScramble = [
    'Bientôt, vous trouverez ici mon portfolio',
    'Bientôt, vous trouverez ici mon portfolio',
    'En attendant, je reste dispo',
    "N'hésitez pas à me contacter par mail",
    "N'hésitez pas à me contacter par mail",
    "N'hésitez pas à me contacter par mail",
  ];
}
