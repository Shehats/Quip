import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Backend } from 'app/Interfaces/Backend';
import { ActionsService } from '../../services/http/actions.service';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private action: ActionsService, private router: Router, private actRoute: ActivatedRoute) { }
  postForm: FormGroup;
  fileToUpload: File = null;
  username: string;
  backend: Backend = new Backend();

  profile: Profile;

  onSubmit() {
    if (this.postForm.valid) {
      let postText = new Post(this.postForm.controls['postText'].value, 0, 0);
      this.action.save<Post>(this.backend.post, postText)
        .subscribe(
          _ => this.postForm.reset()
        );
    }
  }

  handleFileInput(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }



  ngOnInit() {
    this.postForm = new FormGroup({
      postText: new FormControl("", Validators.required)
    })

    this.action.fetch(this.backend.profile) // Fetching Username
    .subscribe(
      () => console.log(this.actRoute), // this.username = this.actRoute
      () => this.router.navigate(['login'])
    )
  }

}
