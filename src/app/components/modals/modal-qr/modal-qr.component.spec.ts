import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQRComponent } from './modal-qr.component';

describe('ModalQRComponent', () => {
  let component: ModalQRComponent;
  let fixture: ComponentFixture<ModalQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalQRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
