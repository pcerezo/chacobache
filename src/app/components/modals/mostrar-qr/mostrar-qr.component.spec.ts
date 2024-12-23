import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarQRComponent } from './mostrar-qr.component';

describe('MostrarQRComponent', () => {
  let component: MostrarQRComponent;
  let fixture: ComponentFixture<MostrarQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarQRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
