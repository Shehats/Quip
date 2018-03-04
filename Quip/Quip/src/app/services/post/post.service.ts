import { Injectable } from '@angular/core';
import { ActionsService } from '../http/actions.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
import { post } from '../../Interfaces/Backend'
import { addImage } from '../../Interfaces/Backend'
import { likePost } from '../../Interfaces/Backend';
import { disLikePost } from '../../Interfaces/Backend';

@Injectable()
export class PostService {

  constructor(private action: ActionsService, private uploadFile: FileUploadService){
  }

  public getPost (): Observable<Post> {
    return this.action.fetch<Post>(post)
                      .map(x => new Post(x['owner'], x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }

//   public getAllPosts (): Observable<Post[]> {
//     return this.action.fetchAll<Post[]>(feed)
//             .map(y => {
//               return y.map(x => new Post(x['owner'],x['comments'], x['postText'],
//               x['dislikes'], x['id'], x['likes'],
//               x['mediaUrl'], x['title'])
//   }));
// }
  public getPostById (id: number): Observable<Post> {
    return this.action.fetchById<Post>(post,id)
                      .map(x => new Post(x['owner'],x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
}

  public savePost (obj: Post): Observable<Post> {
    console.log('sdkjfsdhdfjshfdjjudffsdjdfhsjfdhfdjfdshjsfdhfsdjhfdsjd');
    return this.action.save<Post>(post, obj);
                      // .map(x => new Post(x['owner'],x['comments'], x['postText'],
                      // x['dislikes'], x['id'], x['likes'],
                      // x['mediaUrl'], x['title']));
}

  public updatePost (obj: Post):Observable<Post> {
    return this.action.update<Post>(post, obj)
                        .map(x => new Post(x['owner'],x['comments'], x['postText'],
                        x['dislikes'], x['id'], x['likes'],
                        x['mediaUrl'], x['title']));
  }

  public updatePostById (id: number, obj: Post): Observable<Post> {
    return this.action.updateById(post, id, obj)
                      .map(x => new Post(x['owner'],x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }
  public deletePostById (id: number): Observable<Post> {
    return this.action.deleteById(post, id)
                      .map(x => new Post(x['owner'],x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }

  public uploadPostPicture(fileToUpload: File): Observable<void> {
    return this.uploadFile.uploadPostPicture(fileToUpload)
                          .do(x => this.action.save<Post>(addImage, x));
  }

  public likePost(id:number): Observable<Post>{
    return this.action.updateById(likePost, id, null)
                      .map(x => new Post(x['owner'],x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }

  public dislikePost(id:number): Observable<Post>{
    return this.action.updateById(disLikePost, id, null)
                      .map(x => new Post(x['owner'],x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }
}