import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMultimediaComponent } from './crear-multimedia.component';

describe('CrearMultimediaComponent', () => {
  let component: CrearMultimediaComponent;
  let fixture: ComponentFixture<CrearMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearMultimediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
