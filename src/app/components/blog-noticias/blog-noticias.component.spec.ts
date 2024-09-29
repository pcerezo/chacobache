import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogNoticiasComponent } from './blog-noticias.component';

describe('BlogNoticiasComponent', () => {
  let component: BlogNoticiasComponent;
  let fixture: ComponentFixture<BlogNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogNoticiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
