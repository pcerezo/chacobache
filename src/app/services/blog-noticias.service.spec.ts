import { TestBed } from '@angular/core/testing';

import { BlogNoticiasService } from './blog-noticias.service';

describe('BlogNoticiasService', () => {
  let service: BlogNoticiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogNoticiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
