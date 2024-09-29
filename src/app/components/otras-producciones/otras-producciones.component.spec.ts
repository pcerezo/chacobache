import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrasProduccionesComponent } from './otras-producciones.component';

describe('OtrasProduccionesComponent', () => {
  let component: OtrasProduccionesComponent;
  let fixture: ComponentFixture<OtrasProduccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrasProduccionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtrasProduccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
