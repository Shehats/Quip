import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/models/Post';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() posted: Post;

  constructor() { }

  ngOnInit() {
  }

}
