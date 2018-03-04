import { Injectable } from '@angular/core';
import { ActionsService } from '../http/actions.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
import { post, addImage, likePost, disLikePost } from '../../Interfaces/Backend'

// , feed
@Injectable()
export class PostService {

  constructor(private action: ActionsService, private uploadFile: FileUploadService){
  }

  public getPost (): Observable<Post> {
    return this.action.fetch<Post>(post)
                      .map(x => new Post(x['owner'], x['comments'], x['description'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }

  public getAllPosts (): Observable<Post[]> {
    return this.action.fetchAll<Post[]>(post)
            .map(y => y.map(x => new Post(x['owner'],x['comments'], x['description'],
                                x['dislikes'], x['id'], x['likes'],x['mediaUrl'], x['title'])))
            .catch(err => Observable.throw(err));
}
  public getPostById (id: number): Observable<Post> {
    return this.action.fetchById<Post>(post,id)
                      .map(x => new Post(x['owner'],x['comments'], x['description'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
}

  public savePost (obj: Post): Observable<Post[]> {
    return this.action.save<any>(post, obj)
               .map(y => y.map(x => new Post(x['owner'],x['comments'], x['description'],
                                x['dislikes'], x['id'], x['likes'],x['mediaUrl'], x['title'])))
               .catch(err => Observable.throw(err));
}

  public updatePost (obj: Post):Observable<Post> {
    return this.action.update<Post>(post, obj)
                        .map(x => new Post(x['owner'],x['comments'], x['description'],
                        x['dislikes'], x['id'], x['likes'],
                        x['mediaUrl'], x['title']));
  }

  public updatePostById (id: number, obj: Post): Observable<Post> {
    return this.action.updateById(post, id, obj)
                      .map(x => new Post(x['owner'],x['comments'], x['description'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }
  public deletePostById (id: number): Observable<Post> {
    return this.action.deleteById(post, id)
                      .map(x => new Post(x['owner'],x['comments'], x['description'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }

  public uploadPostPicture(fileToUpload: File, desc?: string): Observable<Post[]> {
    return this.uploadFile.uploadPostPicture(fileToUpload)
                          .flatMap(x => {
                            x['description'] = desc;
                            return this.action.save<any>(addImage, x)
                            .map(y => y.map(x => new Post(x['owner'],x['comments'], x['description'],
                                x['dislikes'], x['id'], x['likes'],x['mediaUrl'], x['title'])))
                             .catch(err => Observable.throw(err));
                          });
  }

  public likePost(id:number): Observable<Post>{
    return this.action.fetchById(likePost, id)
                      .map(x => new Post(x['owner'],x['comments'], x['description'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }

  public dislikePost(id:number): Observable<Post>{
    return this.action.fetchById(disLikePost, id)
                      .map(x => new Post(x['owner'],x['comments'], x['description'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }
}
