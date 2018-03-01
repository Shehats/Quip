import { Component, OnInit } from '@angular/core';
// import { Profile } from 'app/models/Profile';
// import { Post } from 'app/models/Post';
// import { Comment } from 'app/models/Comment';
// import { Account } from 'app/models/Account';
import { ActionsService } from 'app/services/http/actions.service';
import { Backend } from 'app/Interfaces/Backend';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private action: ActionsService, private backend: Backend, private actRoute: ActivatedRoute) { }



  // newComment = new Comment(235, 12, "bitches ain't shit but hos and tricks", 500, 1);
  // comments = [this.newComment];
  // post = new Post(12, 1234, "Hey bb, you lookin supa fly", 12, 400, this.comments);
  // post2 = new Post(12, 12, "FUCK WITH ME", 12, 400, this.comments);
  // post3 = new Post(12, 4, "AY VICTOR YOU SMELL", 12, 400, this.comments);
  // post4 = new Post(12, 14, "MonkaS", 12, 400, this.comments);
  // post5 = new Post(12, 124, "MonkaBold", 12, 400, this.comments);
  // acc = new Account(12, 'Mattyboi', 'Mat', 'Matterson', 23, 'Mat@Mattyboi.com');
  // account: Account = this.acc;
  // posts: Post[] = [this.post, this.post2, this.post3, this.post4, this.post5];
  // friends: Account[] = [];
  // recommendedFriends: Account[] = [];

  // fake: Profile = new Profile(this.acc, this.posts, this.friends, this.recommendedFriends);

  ngOnInit() {
    this.action.fetch(this.backend.profile) // Fetching Username
    .subscribe(
      () => console.log(this.actRoute) // this.username = this.actRoute
    )
  }

}
