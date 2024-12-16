import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarEventoComponent } from './borrar-evento.component';

describe('BorrarEventoComponent', () => {
  let component: BorrarEventoComponent;
  let fixture: ComponentFixture<BorrarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
