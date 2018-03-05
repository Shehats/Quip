import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/Comment';
import { CommentService } from '../../services/comment/comment.service';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
@Input('comments') comments: Comment[];
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

    like(id) {
      this.commentService.likeComment(id)
      .subscribe(
        ()=>console.log("Liked")
      );
    }

    dislike(id){
      this.commentService.dislikeComment(id)
      .subscribe(
        ()=>console.log("Disliked")
      );
    }
}
