import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesBlogComponent } from './detalles-blog.component';

describe('DetallesBlogComponent', () => {
  let component: DetallesBlogComponent;
  let fixture: ComponentFixture<DetallesBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
