import { TestBed, inject } from '@angular/core/testing';

import { ComentService } from './coment.service';

describe('ComentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComentService]
    });
  });

  it('should be created', inject([ComentService], (service: ComentService) => {
    expect(service).toBeTruthy();
  }));
});
