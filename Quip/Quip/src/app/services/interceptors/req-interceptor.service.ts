import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CacheService } from '../cache/cache.service';
import { Token } from '../../Interfaces/Token';

@Injectable()
export class ReqInterceptorService implements HttpInterceptor{
  private token: any;
  constructor(private cache: CacheService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type'))
      req = req.clone({headers: 
        req.headers.set('Content-Type', 'application/json')
      });
    this.cache.getAuthToken().subscribe(
      x => {
        if (x instanceof Token)
          this.token = x;
      }
    );

    if (this.token && !req.headers.has('Authorization'))
      req = req.clone({headers: 
        req.headers.set('Authorization', this.token)
      });
    return next.handle(req.clone({headers: 
      req.headers.set('Accept', 'application/json')}))
      .do((res: HttpResponse<any>) => {
        if (res.body['token']) {
          let token = new Token(res.body['token'], res.body['expiry']);
          this.cache.setToken(token);
        }
      });
  }

}
