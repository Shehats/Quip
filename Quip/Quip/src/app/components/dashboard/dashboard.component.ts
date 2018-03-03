import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Backend } from 'app/Interfaces/Backend';
import { ActionsService } from '../../services/http/actions.service';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private action: ActionsService, private uploadFile: FileUploadService/*, private router: Router, private actRoute: ActivatedRoute*/) { }

  postForm: FormGroup; // Post Form values
  descForm: FormGroup; // Description data

  fileToUpload: File; // actual file to upload
  localUrl; // To display the image preview

  username: string;
  backend: Backend = new Backend(); // access to backend data.

  profile: Profile; // Profile data.
  state: boolean; // sets the state of either being a profile or a dashboard

  descText: string = "This is a test";
  friends$: Profile[];

  submitPost() {
    console.log('sddkdfkffkjk');
    if (this.postForm.valid) {
      let postText = new Post(this.postForm.controls['postText'].value, null, null);
      console.log(postText);
      this.action.save<Post>(this.backend.post, postText)
        .subscribe(
          _ => this.postForm.reset(),
          _ => console.log(this.profile.posts)
        );
      this.uploadFile.uploadPostPicture(this.fileToUpload)
      .subscribe(
        x => console.log(x),
        err => console.log(err)
      );
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


  handleProfilePicInput(files: FileList) {
    console.log(files);
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

  ngOnInit() {
    this.postForm = new FormGroup({
      postText: new FormControl("", Validators.required)
    })

    this.descForm = new FormGroup({
      desc: new FormControl()
    })

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
