import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post/post.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input('posts') posts: Post[];
  @Input('obsPosts') posts$: Observable<Post[]>;
  @Input('searchArg') searchArg: string;
  @Input('picture') profilePicture: string;
  constructor(private postService: PostService) { }
  
  ngOnInit() {
    this.posts.map(x => new Post(x['owner'], x['comments'], x['description'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }

  like(post: Post) {
    this.postService.likePost(post.id)
    .subscribe(
      _ => location.reload()
    );
  }

  dislike(post: Post){
    this.postService.dislikePost(post.id)
    .subscribe(
     _ => location.reload()
    );
  }
}
