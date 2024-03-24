import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TextScrambleEffectComponent } from '../../shared/components/text-scramble-effect/text-scramble-effect.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextScrambleEffectComponent, HeaderComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  textToScramble = [
    'Bientôt ici mon portfolio',
    'Bientôt ici mon portfolio',
    'Je cherche une alternance Java Angular',
    'Je cherche une alternance Java Angular',
    "N'hésitez pas à me contacter ! :)",
    "N'hésitez pas à me contacter ! :)",
  ];

  mp = signal(0);
  QUERY_STRING_KEY = 'wanttoconnect';
  mpByUser = '';

  constructor(private _route: ActivatedRoute, private _http: HttpClient) {
    this.mp.update((v) => v);
  }

  ngOnInit(): void {
    // Send SMS to my device to connect in admin mode
    this._route.queryParamMap.subscribe((qpm) => {
      if (qpm.has(this.QUERY_STRING_KEY)) {
        this.mp.set(Math.ceil(Math.random() * environment.SMS.SALT!));
        this._http
          .get(
            `https://smsapi.free-mobile.fr/sendmsg?user=${
              environment.SMS.LOGIN
            }&pass=${environment.SMS.API_KEY}&msg=${this.mp()}`
          )
          .subscribe();
      }
    });
  }
}
