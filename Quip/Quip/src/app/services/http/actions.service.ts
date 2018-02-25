import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActionsService {
  constructor(private http: HttpClient){
  }

  public fetch <T> (actionUrl: string): Observable<T> {
    return this.http.get<T>(actionUrl);
  }

  public fetchAll <T> (actionUrl: string): Observable<T[]> {
    return this.http.get<T[]>(actionUrl);
  }

  public fetchById <T> (actionUrl: string, id: number): Observable<T> {
    return this.http.get<T>(actionUrl + '/' +id);            
  }

  public save <T> (actionUrl: string, obj: T): Observable<T> {
    return this.http.post<T>(actionUrl, JSON.stringify(obj));
  }

  public update <T> (actionUrl: string, obj: T) {
    return this.http.put<T>(actionUrl, JSON.stringify(obj));
  }

  public updateById <T> (actionUrl: string, id: number, obj: T): Observable<T> {
    return this.http.put<T>(actionUrl + '/' + id, JSON.stringify(obj));
  }
  public deleteById <T> (actionUrl: string, id: number): Observable<T> {
    return this.http.delete<T>(actionUrl + '/' +id);
  }
}
