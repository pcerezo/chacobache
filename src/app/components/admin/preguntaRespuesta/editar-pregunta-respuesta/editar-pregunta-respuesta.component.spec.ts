import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPreguntaRespuestaComponent } from './editar-pregunta-respuesta.component';

describe('EditarPreguntaRespuestaComponent', () => {
  let component: EditarPreguntaRespuestaComponent;
  let fixture: ComponentFixture<EditarPreguntaRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPreguntaRespuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPreguntaRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
