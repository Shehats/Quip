import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileUploadService {

  constructor(private http: Http) { }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    
    return this.http
      .post(endpoint, formData)
      .map(() => { return true; })
      .catch((e) => Observable.throw(e));
  }
}
