import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Backend } from '../../Interfaces/Backend';


@Injectable()
export class FileUploadService {
  backend: Backend = new Backend();
  constructor(private http: Http) { }

  uploadProfilePicture(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .post(this.backend.uploadProfilePic, formData)
      .map(res => res.json())
      .catch((e) => Observable.throw(e));
  }

  uploadPostPicture(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .post(this.backend.uploadPostPic, formData)
      .map(res => res.json())
      .catch((e) => Observable.throw(e));
  }

  updatePostPicture(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .put(this.backend.uploadProfilePic, formData)
      .catch((e) => Observable.throw(e));
  }
}
