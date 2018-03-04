import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/Post';
import { Observable } from 'rxjs/Observable'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  post$: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.post$ = this.postService.getAllPosts();
  }


}
