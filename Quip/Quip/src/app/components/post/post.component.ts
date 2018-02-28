import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/Post';
import { Account } from 'app/models/Account';
import { Comment } from 'app/models/Comment';
import { Profile } from 'app/models/Profile';
import { ActionsService } from 'app/services/http/actions.service';
import { Backend } from 'app/Interfaces/Backend';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private actions: ActionsService) { }
  newComment = new Comment(235, 12, "bitches ain't shit but hos and tricks", 500, 1);
  comments = [this.newComment];
  post = new Post(12, 1234, "Hey bb, you lookin supa fly", 12, 400, this.comments);
  acc = new Account(12, 'Mattyboi', 'Mat', 'Matterson', 23, 'Mat@Mattyboi.com');
  backend: Backend = new Backend();
  profile: Profile;

  createPost(posting: Post) {
    this.post = posting;
    this.actions.fetchById(this.backend.profile, posting.parentId).subscribe(
      profile => this.profile = <Profile>profile,
      _ => console.log("ay bb u want sum fuk?????"),
      () => console.log("we in it boissssss")
    );
    console.log(this.profile);
    this.acc = this.profile.account;
  }

  ngOnInit() {
    this.createPost(this.post);
  }

}
