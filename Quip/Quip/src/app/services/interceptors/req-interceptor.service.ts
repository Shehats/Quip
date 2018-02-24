import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReqInterceptorService implements HttpInterceptor{
  constructor() { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type'))
      req = req.clone({headers: 
        req.headers.set('Content-Type', 'application/json')
      });
    return next.handle(req.clone({headers: 
      req.headers.set('Accept', 'application/json')}));
  }

}
