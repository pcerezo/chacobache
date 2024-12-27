import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPreguntaRespuestaComponent } from './crear-pregunta-respuesta.component';

describe('CrearPreguntaRespuestaComponent', () => {
  let component: CrearPreguntaRespuestaComponent;
  let fixture: ComponentFixture<CrearPreguntaRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPreguntaRespuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPreguntaRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
