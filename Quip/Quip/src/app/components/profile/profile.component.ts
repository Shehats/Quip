import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { Backend } from 'app/Interfaces/Backend';
import {ActionsService} from '../../services/http/actions.service';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { post, profile, account } from 'app/Interfaces/Backend';
import { Account } from 'app/models/Account';
// import { NavbarComponent } from 'app/components/navbar/navbar.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  constructor(private postService: PostService, private uploadFile: FileUploadService, private action: ActionsService/*, private router: Router, private actRoute: ActivatedRoute*/) { }

  postForm: FormGroup; // Post Form values
  descForm: FormGroup; // Description data
  fileToUpload: File; // actual file to upload
  profileUpload: File; // profile picture to upload
  localUrl; // To display the image preview
  username: string;
  profile: Profile; // Profile data.
  state: boolean; // sets the state of either being a profile or a dashboard
  acc: Account;
  posts: Post[];

  descText: string = "This is a test";
  friends$: Profile[];

  submitPost() {
    if (this.postForm.valid) {
      if (this.uploadFile) {
        console.log('skkdfkjkgkjg');
        console.log(this.postForm.controls['postText'].value);
        this.postService.uploadPostPicture(this.fileToUpload)
        .subscribe(
          x => {
            this.postService.savePost<Post>(new Post(x['comments'], this.postForm.controls['postText'].value, x['dislikes'],
                                                            x['id'], x['likes'], x['mediaUrl'], x['title']))
                                                            .subscribe(x => console.log(x));
          },
          err => console.log(err)
        );
      } else {
        this.postService.savePost<Post>(new Post(null, this.postForm.controls['postText'].value, null, null, null, null, null))
          .subscribe(
            _ => this.postForm.reset()
          );
      }
    }
  }

  submitDesc() {
    if (this.descForm.valid) {
      this.action.update<Profile>(profile, this.pro);
    }
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileToUpload = event.target.files.item(0);
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
    }
  }


  handleProfilePicInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.profileUpload = event.target.files.item(0);
    }
  }

  uploadProfilePic() {
    if (this.profileUpload) {
      this.uploadFile.uploadProfilePicture(this.profileUpload)
      .subscribe(x => {
        this.action.save<any>(account+'/updatePicture', x)
      })
    }
  }

  updateDesc(data) {
    if (data) {
      this.pro.description = data;
      console.log(data);
    }
  }

  handleProfileInfo(data) {
    console.log(data);
  }

  handleEvent(stateMode: any) {
    this.state = stateMode;
    console.log(this.state);
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      postText: new FormControl("", Validators.required)
    })

    this.descForm = new FormGroup({
      desc: new FormControl()
    })

    this.action.fetch<Profile>(profile)
      .subscribe(
        profile => { this.pro = profile; console.log(profile); }
      )

    this.username = this.actRoute.snapshot.params.username;//Gets the username
    if (this.username) {
      this.action.fetch<Profile>(profile + '/' + this.username)
      .subscribe(
        (profile: Profile) => this.saveVariables(<Profile>profile),
        _ => console.log('wake me up')
        // this.username = this.actRoute
        )
    }
    else {
      this.action.fetch<Profile>(profile)
        .subscribe(
        (profile: Profile) => this.saveVariables(<Profile>profile),
        _ => console.log('wake me up')
        // this.username = this.actRoute
        )
    }
    // this.action.fetch(this.backend.profile) // Fetching Username
    //   .subscribe(
    //     () => console.log(this.actRoute), // this.username = this.actRoute
    //     () => this.router.navigate(['login'])
    //   )
  }

  saveVariables(profiling: Profile) {
    this.pro = profiling;
    this.posts = profiling.posts;
    this.acc = new Account(profiling.account.id, profiling
      .account.username, profiling.account.fname, profiling.account.lname, profile, profiling.account.email);
    console.log(profile);
  }


}
