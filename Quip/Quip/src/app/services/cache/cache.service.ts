import { Injectable } from '@angular/core';
import { Token } from '../../Interfaces/Token';
import { Observable } from 'rxjs/Rx';
import * as _storage from 'localforage';

@Injectable()
export class CacheService {
  constructor() { }

  public setToken(token: Token): Observable<Token> {
    return Observable.fromPromise(_storage.setItem('token', token));
  }

  public getAuthToken(): Observable<any> {
    return (this.getToken()
      .filter((x:Token) => x.expiry < Date.now()))
    ? this.getToken()
    : this.removeToken();
  }

  private getToken(): Observable<Token> {
    return Observable.fromPromise(_storage.getItem('token'));
  }

  public removeToken(): Observable<void> {
    return Observable.fromPromise(_storage.removeItem('token'));
  }

}
