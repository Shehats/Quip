import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Backend } from 'app/Interfaces/Backend';
import { ActionsService } from '../../services/http/actions.service';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
// import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
// , private router: Router, private actRoute: ActivatedRoute
export class ProfileComponent implements OnInit {
  constructor(private action: ActionsService) { }
  postForm: FormGroup;
  descForm: FormGroup;

  fileToUpload: any[];
  localUrl;
  username: string;
  backend: Backend = new Backend();

  profile: Profile;
  isDescEditable: boolean = false;

  submitPost() {
    if (this.postForm.valid) {
      let postText = new Post(this.postForm.controls['postText'].value, 0, 0);
      this.action.save<Post>(this.backend.post, postText)
        .subscribe(
          _ => this.postForm.reset()
        );
    }
  }

  submitDesc() {
    if (this.descForm.valid) {
      // this.action.update<Profile>(this.backend.baseUrl, )
    }
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  handleProfilePicInput(files: FileList) {
    console.log(files);
  }

  updateDesc(data) {
    console.log(data);
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
        profile => { this.profile = profile }
      )

    // this.action.fetch(this.backend.profile) // Fetching Username
    //   .subscribe(
    //     () => console.log(this.actRoute), // this.username = this.actRoute
    //     () => this.router.navigate(['login'])
    //   )
  }

}
