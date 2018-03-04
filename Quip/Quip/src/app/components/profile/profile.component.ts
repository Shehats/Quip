import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Backend } from 'app/Interfaces/Backend';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../../services/profile/profile.service';
import { PostService } from 'app/services/post/post.service'
// import { NavbarComponent } from 'app/components/navbar/navbar.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, private postService: PostService) { }

  postForm: FormGroup; // Post Form values
  descForm: FormGroup; // Description data
  fileToUpload: File; // actual file to upload
  profileUpload: File; // profile picture to upload
  localUrl; // To display the image preview
  username: string;
  //backend: Backend = new Backend(); // access to backend data.
  profile$: Observable<Profile>; // Profile data.
  profileToUpdate: Profile;
  state: boolean; // sets the state of either being a profile or a dashboard

  descText: string = "This is a test";
  friends$: Profile[];

  ngOnInit() {
    this.postForm = new FormGroup({
      postText: new FormControl("", Validators.required)
    })

    this.descForm = new FormGroup({
      desc: new FormControl()
    })

    this.profile$ = this.profileService.getUserProfile();
  }

  submitPost() {
    if (this.postForm.valid) {
      console.log('ssdjfdfdjsfdhsfdj');
      if (this.fileToUpload) {
        this.postService.uploadPostPicture(this.fileToUpload).subscribe(x => console.log(x));
        // this.postService.savePost(new Post(null,this.postForm.controls['postText'].value,null,null,null,null,null));
      } else {
        this.profile$ = this.postService.savePost(new Post(null,null,null, this.postForm.controls['postText'].value,null,null,null,null))
                        .flatMap(_ => this.profileService.getUserProfile());

      }
    }
  }

  submitDesc() {
    if (this.descForm.valid) {
      this.profile$.do(x => this.profileToUpdate = x);
      this.profile$ = this.profileService.updateProfile(this.profileToUpdate);
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
      console.log('sdfdfdjfhdjfhjfhfjhdf');
      this.profileService.updateProfilePicture(this.profileUpload).subscribe(x => console.log(x));
      // this.profile$.do(x => this.profileToUpdate = x);
      // this.profileService.updateProfilePicture(this.profileUpload);
    }
  }

  handleProfileInfo(data) {
    console.log(data);
  }

}
