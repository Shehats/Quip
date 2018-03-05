import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CacheService } from '../cache/cache.service';
import { Token } from '../../Interfaces/Token';
import { Router } from '@angular/router';


@Injectable()
export class ReqInterceptorService implements HttpInterceptor{
  constructor(private cache: CacheService, private router: Router) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.cache.getAuthToken())
    .map((x: Token) => {
      if (x)
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + x.token)})
      return req;
    }).flatMap((x: HttpRequest<any>) => {
      return next.handle(x.clone({headers: 
        req.headers.set('Accept', 'application/json')}))
      .do((res: HttpResponse<any>) => {
        if (res.body) {
          if (res.body['token']) {
            let token = new Token(res.body['token'], res.body['expiry']);
            this.cache.setToken(token);
          }
        }
      },
      (_: HttpErrorResponse) => {
        this.cache.removeToken();
        this.router.navigate(['login'])
        });
    })
  }
}
