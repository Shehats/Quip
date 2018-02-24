import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActionsService {
  private actionUrl: string;
  constructor(private http: HttpClient){
    this.actionUrl = 'https://127.0.0.1:8990';
  }
  public fetch <T> (url: string): Observable<T> {
    return this.http.get<T>(this.actionUrl + '/' + url);
  }

  public fetchAll <T> (url: string): Observable<T[]> {
    return this.http.get<T[]>(this.actionUrl + '/' + url);
  }

  public fetchById <T> (url: string, id: number): Observable<T> {
    return this.http.get<T>(this.actionUrl + '/' + url + '/' +id);            
  }

  public save <T> (url: string, obj: T): Observable<T> {
    return this.http.post<T>(this.actionUrl + '/' + url, JSON.stringify(obj));
  }

  public update <T> (url: string, obj: T) {
    return this.http.put<T>(this.actionUrl + '/' + url, JSON.stringify(obj));
  }

  public updateById <T> (url: string, id: number, obj: T): Observable<T> {
    return this.http.put<T>(this.actionUrl + '/' + url + '/' + id, JSON.stringify(obj));
  }
  public deleteById <T> (url: string, id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + '/' + url + '/' +id);
  }
}
