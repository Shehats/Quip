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
  postlist: any;
  @Input('picture') profilePicture: string;
  searchArg: string;
  constructor(private postService: PostService) { }
  
  ngOnInit() {
    this.posts.map(x => new Post(x['owner'], x['comments'], x['description'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
  }

  like(id) {
    this.postService.likePost(id)
    .subscribe(
      _ => location.reload()
    );
  }

  dislike(id){
    this.postService.dislikePost(id)
    .subscribe(
     _ => location.reload()
    );
  }
}
