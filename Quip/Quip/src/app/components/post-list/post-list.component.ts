import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input('posts') posts: Post[];
  constructor(private postService: PostService) { }
  ngOnInit() {

  }

  like(id) {
    this.postService.likePost(id)
    .subscribe(
      ()=>console.log("Liked")
    );
  }

  dislike(id){
    this.postService.dislikePost(id)
    .subscribe(
      ()=>console.log("Disliked")
    );
  }
}
