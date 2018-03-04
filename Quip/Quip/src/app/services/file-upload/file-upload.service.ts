import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { uploadProfilePic, uploadPostPic } from '../../Interfaces/Backend';


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
      .put(uploadProfilePic, formData)
      .catch((e) => Observable.throw(e));
  }
}
