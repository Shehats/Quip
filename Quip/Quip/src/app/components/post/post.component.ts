import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/models/Post';
import { Account } from 'app/models/Account';
// import { Comment } from 'app/models/Comment';
import { Profile } from 'app/models/Profile';
import { ActionsService } from 'app/services/http/actions.service';
//import { Backend } from 'app/Interfaces/Backend';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() acc: Account;

  constructor(private actions: ActionsService, private backend: Backend) { }
  
  profile: Profile;

  createPost(posting: Post) {
    // this.post = posting;
    // this.actions.fetchById(this.backend.profile, posting.parentId).subscribe(
    //   profile => this.profile = <Profile>profile,
    //   _ => console.log("ay bb u want sum fuk?????"),
    //   () => console.log("we in it boissssss")
    // );
    // console.log(this.profile);
    // this.acc = this.profile.account;
  }

  ngOnInit() {
    // this.createPost(this.post);
  }

}
