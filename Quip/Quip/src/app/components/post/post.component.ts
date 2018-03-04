import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/models/Post';
import { Account } from 'app/models/Account';
// import { Comment } from 'app/models/Comment';
import { Profile } from 'app/models/Profile';
import { ActionsService } from 'app/services/http/actions.service';
import { post, profile } from 'app/Interfaces/Backend';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() posted: Post;
  @Input() acc: Account;

  constructor(private actions: ActionsService) { }
  
  pro: Profile;

  createPost(posting: Post) {
    this.posted = posting;
    this.actions.fetchById(profile, posting.id).subscribe(
      profile => this.pro = <Profile>profile,
      _ => console.log("ay bb u want sum fuk?????"),
      () => console.log("we in it boissssss")
    );
    console.log(this.pro);
    this.acc = this.pro.account;
  }

  ngOnInit() {
    this.createPost(this.posted);
  }

}
