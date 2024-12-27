import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPreguntaRespuestaComponent } from './lista-pregunta-respuesta.component';

describe('ListaPreguntaRespuestaComponent', () => {
  let component: ListaPreguntaRespuestaComponent;
  let fixture: ComponentFixture<ListaPreguntaRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPreguntaRespuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPreguntaRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
