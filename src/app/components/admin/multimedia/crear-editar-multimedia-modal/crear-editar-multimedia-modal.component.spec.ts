import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarMultimediaModalComponent } from './crear-editar-multimedia-modal.component';

describe('CrearEditarMultimediaModalComponent', () => {
  let component: CrearEditarMultimediaModalComponent;
  let fixture: ComponentFixture<CrearEditarMultimediaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEditarMultimediaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEditarMultimediaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
