import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextScrambleEffectComponent } from './text-scramble-effect.component';

describe('TextScrambleEffectComponent', () => {
  let component: TextScrambleEffectComponent;
  let fixture: ComponentFixture<TextScrambleEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextScrambleEffectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextScrambleEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
