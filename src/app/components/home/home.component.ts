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
    'Bientôt ici mon portfolio',
    'Bientôt ici mon portfolio',
    'Je cherche une alternance Java Angular',
    'Je cherche une alternance Java Angular',
    "N'hésitez pas à me contacter ! :)",
    "N'hésitez pas à me contacter ! :)",
  ];
}
