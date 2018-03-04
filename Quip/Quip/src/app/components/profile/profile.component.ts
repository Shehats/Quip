import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Backend } from 'app/Interfaces/Backend';
import { ActionsService } from '../../services/http/actions.service';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { NavbarComponent } from 'app/components/navbar/navbar.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  constructor(private action: ActionsService, private uploadFile: FileUploadService/*, private router: Router, private actRoute: ActivatedRoute*/) { }

  postForm: FormGroup; // Post Form values
  descForm: FormGroup; // Description data
  fileToUpload: File; // actual file to upload
  profileUpload: File; // profile picture to upload
  localUrl; // To display the image preview
  username: string;
  backend: Backend = new Backend(); // access to backend data.
  profile: Profile; // Profile data.
  state: boolean; // sets the state of either being a profile or a dashboard

  descText: string = "This is a test";
  friends$: Profile[];

  submitPost() {
    if (this.postForm.valid) {
      if (this.uploadFile) {
        console.log('skkdfkjkgkjg');
        console.log(this.postForm.controls['postText'].value);
        this.uploadFile.uploadPostPicture(this.fileToUpload)
        .subscribe(
          x => {
            this.action.save<Post>(this.backend.post + '/image', new Post(x['comments'], this.postForm.controls['postText'].value, x['dislikes'],
                                                            x['id'], x['likes'], x['mediaUrl'], x['title']))
                                                            .subscribe(x => console.log(x));
          },
          err => console.log(err)
        );
      } else {
        console.log('here');
        this.action.save<Post>(this.backend.post, new Post(null, this.postForm.controls['postText'].value, null, null, null, null, null))
          .subscribe(
            _ => this.postForm.reset()
          );
      }
    }
  }

  submitDesc() {
    if (this.descForm.valid) {
      this.action.update<Profile>(this.backend.profile, this.profile);
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
        this.action.save<any>(this.backend.account+'/updatePicture', x)
      })
    }
  }

  updateDesc(data) {
    if (data) {
      this.profile.description = data;
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

    this.action.save<Post>(this.backend.post, new Post(null,'sdffdkfdkfdjdk', null, null))
    .subscribe(x => console.log(x),
              _ => console.log('errr'))

    this.action.fetch<Profile>(this.backend.profile)
      .subscribe(
        profile => { this.profile = profile; console.log(profile); }
      )

    // this.action.fetch(this.backend.profile) // Fetching Username
    //   .subscribe(
    //     () => console.log(this.actRoute), // this.username = this.actRoute
    //     () => this.router.navigate(['login'])
    //   )
  }

}
