import { Injectable } from '@angular/core';
import { ActionsService } from '../http/actions.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/throw';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
import { post } from '../../Interfaces/Backend'
import { feed } from '../../Interfaces/Backend'

@Injectable()
export class PostService {

  constructor(private action: ActionsService, private uploadFile: FileUploadService){
  }

  public getPost (): Observable<Post> {
    return this.action.fetch<Post>(post)
                      .map(x => new Post(x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']))
                      .catch((e) => Observable.throw(e));
  }

  public getAllPosts (): Observable<Post[]> {
    return this.action.fetchAll<Post[]>(feed)
            .map(y => {
              return y.map(x => new Post(x['comments'], x['postText'],
              x['dislikes'], x['id'], x['likes'],
              x['mediaUrl'], x['title']))
            }).catch((e) => Observable.throw(e));
  }

  public getPostById <Post> (id: number): Observable<Post> {
    return this.action.fetchById<Post>(post,id)
                      .map(x => new Post(x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']))
                      .catch((e) => Observable.throw(e));
  }

  public save <Post> (obj: Post): Observable<Post> {
    return this.action.save(post, obj)
                      .map(x => new Post(x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']))
                      .catch((e) => Observable.throw(e));
  }

  public update <Post> (obj: Post):Observable<Post> {
    return this.action.update<Post>(post, obj)
                        .map(x => new Post(x['comments'], x['postText'],
                        x['dislikes'], x['id'], x['likes'],
                        x['mediaUrl'], x['title']))
                        .catch((e) => Observable.throw(e));
  }

  public updateById <Post> (id: number, obj: Post): Observable<Post> {
    return this.action.updateById(post, id, obj)
                      .map(x => new Post(x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']))
                      .catch((e) => Observable.throw(e));
  }
  public deleteById <Post> (id: number): Observable<Post> {
    return this.action.deleteById(post, id)
                      .map(x => new Post(x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']))
                      .catch((e) => Observable.throw(e));
  }

  public uploadPostPicture(fileToUpload: File): Observable<void> {
    return this.uploadFile.uploadPostPicture(fileToUpload);
  }
}
