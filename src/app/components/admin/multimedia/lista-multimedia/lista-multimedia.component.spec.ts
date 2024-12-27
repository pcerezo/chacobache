import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMultimediaComponent } from './lista-multimedia.component';

describe('ListaMultimediaComponent', () => {
  let component: ListaMultimediaComponent;
  let fixture: ComponentFixture<ListaMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMultimediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
