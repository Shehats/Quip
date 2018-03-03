import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { comment, commentUpdate } from 'app/Interfaces/Backend';
import { Comment } from 'app/models/Comment';
import { ActionsService } from 'app/services/http/actions.service';

@Injectable()
export class ComentService {

  constructor(private action: ActionsService) { }

  public getComment (id: number): Observable<Comment> {
    return this.action.fetchById<Comment>(comment, id)
            .map(x => new Comment(x['id'], x['owner'], x['description'],
              x['parentPost'], x['likes'], x['dislikes']))
            .catch((e) => Observable.throw(e));
  }

  public getAllComments (): Observable<Comment[]>{
    return this.action.fetchAll<Comment>(comment)
          .map(y => {return y.map(x => new Comment(x['id'], x['owner'], x['description'],
            x['parentPost'], x['likes'], x['dislikes']))
          })
          .catch((e) => Observable.throw(e));
  }

  public createComment (obj: Comment): Observable<Comment>{
    return this.action.save<Comment>(comment, obj)
          .map(x => new Comment(x['id'], x['owner'], x['description'],
            x['parentPost'], x['likes'], x['dislikes']))
          .catch((e) => Observable.throw(e));
  }

  public likeComment (id: number, obj: Comment): Observable<Comment>{
    return this.action.updateById<Comment>(commentUpdate, id, obj)
          .map(x => new Comment(x['id'], x['owner'], x['description'],
          x['parentPost'], x['likes'], x['dislikes']))
          .catch((e) => Observable.throw(e));
  }

  public dislikeComment (id: number, obj: Comment): Observable<Comment>{
    return this.action.updateById<Comment>(commentUpdate, id, obj)
          .map(x => new Comment(x['id'], x['owner'], x['description'],
          x['parentPost'], x['likes'], x['dislikes']))
          .catch((e) => Observable.throw(e));
  }

  public deleteComment (id: number): Observable<void>{
    return this.action.deleteById<void>(comment, id);
  }
}
