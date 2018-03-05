import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../../services/profile/profile.service';
import { PostService } from 'app/services/post/post.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

  postForm: FormGroup; // Post Form values
  descForm: FormGroup; // Description data
  fileToUpload: File; // actual file to upload
  profileUpload: File; // profile picture to upload
  localFileUrl; // To display the image preview
  localProfileUrl; // To display the image preview
  username: string;
  friendzy: boolean = true;
  //backend: Backend = new Backend(); // access to backend data.
  profile$: Observable<Profile>; // Profile data.
  posts$: Observable<Post[]>;
  profileToUpdate: Profile;
  state: boolean; // sets the state of either being a profile or a dashboard
  profilePic: string;
  descText: string = "I am lonely";
  friends$: Profile[];
  sub: any;
  dashboard: boolean = false;
  dashboard$: Observable<Post[]>;
  searchArg: string;

  ngOnInit() {
    this.postForm = new FormGroup({
      postText: new FormControl("", Validators.required)
    })

    this.descForm = new FormGroup({
      desc: new FormControl()
    })

    this.sub = this.route.params.subscribe(params => {
      this.username = params['username'];
      if (this.username) {
        this.profileService.getUserProfileByUsername(this.username)
          .subscribe(_ => {
            this.profile$ = this.profileService.getUserProfileByUsername(this.username);
            this.profile$.forEach(x => this.posts$ = Observable.of(x.posts));
          },
            _ => this.router.navigate(['notfound'])
          )
        this.profile$.forEach(x => {
          if (!x.account)
            this.router.navigate(['notfound'])
        });
      }
      else {
        this.profile$ = this.profileService.getUserProfile();
        this.posts$ = this.postService.getFeed();
      }
      this.dashboard$ = this.postService.getAllPosts();
    });
    
  }

  submitPost() {
    if (this.postForm.valid) {
      if (this.fileToUpload) {
        this.posts$ = this.postService.uploadPostPicture(this.fileToUpload, this.postForm.controls['postText'].value);
      } else {
        let x = new Post();
        x.description = this.postForm.controls['postText'].value;
        this.posts$ = this.postService.savePost(x);
      }
    }
  }

  submitDesc() {
    if (this.descForm.valid) {
      this.profile$.forEach(x => {
        x.description = this.descText;
        console.log(x);
        this.profile$ = this.profileService.updateProfile(x);
      });
    }
  }

  toggle () {
    this.dashboard = !this.dashboard;
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileToUpload = event.target.files.item(0);
      reader.onload = (event: any) => {
        this.localFileUrl = event.target.result;
        console.log(this.localFileUrl);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clearPostImagePreview() {
    this.localFileUrl = null;
    this.fileToUpload = null;
  }


  handleProfilePicInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.profileUpload = event.target.files.item(0);
      console.log(this.profileUpload)
      reader.onload = (event: any) => {
        this.localProfileUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clearProfilePreview(){
    this.localProfileUrl = null;
    this.profileUpload = null;
  }

  uploadProfilePic() {
    if (this.profileUpload) {
      this.profile$ = this.profileService.updateProfilePicture(this.profileUpload)
        .flatMap(_ => this.profileService.getUserProfile());
      this.profile$.forEach(x => this.posts$ = Observable.of(x.posts));
    }
  }
}
