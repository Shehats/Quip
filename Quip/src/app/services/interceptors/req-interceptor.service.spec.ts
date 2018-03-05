import { TestBed, inject } from '@angular/core/testing';

import { ReqInterceptorService } from './req-interceptor.service';

describe('ReqInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReqInterceptorService]
    });
  });

  it('should be created', inject([ReqInterceptorService], (service: ReqInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
