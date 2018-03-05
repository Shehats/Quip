import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { uploadPostPic } from '../../Interfaces/Backend';
import { uploadProfilePic } from '../../Interfaces/Backend';

//Keep these thingscontained in here because we are using Http instead of HttpClient
@Injectable()
export class FileUploadService {
  constructor(private http: Http) { }

  uploadProfilePicture(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .post(uploadProfilePic, formData)
      .map(res => res.json())
      .catch((e) => Observable.throw(e));
  }

  uploadPostPicture(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .post(uploadPostPic, formData)
      .map(res => res.json())
      .catch((e) => Observable.throw(e));
  }

  updatePostPicture(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .put(uploadPostPic, formData)
      .catch((e) => Observable.throw(e));
  }
}
