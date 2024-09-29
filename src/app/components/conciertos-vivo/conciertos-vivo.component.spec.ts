import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciertosVivoComponent } from './conciertos-vivo.component';

describe('ConciertosVivoComponent', () => {
  let component: ConciertosVivoComponent;
  let fixture: ComponentFixture<ConciertosVivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciertosVivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConciertosVivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
