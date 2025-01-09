import { TestBed } from '@angular/core/testing';

import { PreguntaRespuestaService } from './pregunta-respuesta.service';

describe('PreguntaRespuestaServiceService', () => {
  let service: PreguntaRespuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntaRespuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
