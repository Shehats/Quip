import { Injectable } from '@angular/core';
import { ActionsService } from '../http/actions.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../../models/Comment';
import { comment, likeComment, disLikeComment } from '../../Interfaces/Backend'

@Injectable()
export class CommentService {
  // id: number;
  // owner: Account;
  // parentId: Profile;
  // description: string;
  // likes: Account[];
  // dislikes: Account[];
  constructor(private action: ActionsService){
  }

  public getComment (): Observable<Comment> {
    return this.action.fetch<Comment>(comment)
                      .map(x => new Comment(x['id'], x['owner'], x['parentId'],
                      x['description'], x['likes'], x['dislikes']));
  }


  public getAllCommentFromPost (postId:number): Observable<Comment> {
    return this.action.fetchById<Comment[]>(comment, postId)
                      .map(x => new Comment(x['id'], x['owner'], x['parentId'],
                      x['description'], x['likes'], x['dislikes']));
}

  public saveComment (obj: Comment): Observable<Comment> {
    return this.action.save<Comment>(comment, obj);
                      // .map(x => new Comment(x['owner'],x['comments'], x['CommentText'],
                      // x['dislikes'], x['id'], x['likes'],
                      // x['mediaUrl'], x['title']));
}

  public updateComment (obj: Comment):Observable<Comment> {
    return this.action.update<Comment>(comment, obj)
                        .map(x => new Comment(x['id'], x['owner'], x['parentId'],
                        x['description'], x['likes'], x['dislikes']));
  }

  public updateCommentById (id: number, obj: Comment): Observable<Comment> {
    return this.action.updateById(comment, id, obj)
                      .map(x => new Comment(x['id'], x['owner'], x['parentId'],
                      x['description'], x['likes'], x['dislikes']));
  }
  public deleteCommentById (id: number): Observable<Comment> {
    return this.action.deleteById(comment, id)
                      .map(x => new Comment(x['id'], x['owner'], x['parentId'],
                      x['description'], x['likes'], x['dislikes']));
  }

  public likeComment(id:number): Observable<Comment>{
    return this.action.updateById(likeComment, id, null)
                      .map(x => new Comment(x['id'], x['owner'], x['parentId'],
                      x['description'], x['likes'], x['dislikes']));
  }

  public dislikeComment(id:number): Observable<Comment>{
    return this.action.updateById(disLikeComment, id, null)
                      .map(x => new Comment(x['id'], x['owner'], x['parentId'],
                      x['description'], x['likes'], x['dislikes']));
  }
}
