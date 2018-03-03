import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post/post.service';
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
  constructor(private postService: PostService, private uploadFile: FileUploadService, private action: ActionsService/*, private router: Router, private actRoute: ActivatedRoute*/) { }

  postForm: FormGroup; // Post Form values
  descForm: FormGroup; // Description data

  fileToUpload: File; // actual file to upload
  localUrl; // To display the image preview

  username: string;

  profile: Profile; // Profile data.
  state: boolean; // sets the state of either being a profile or a dashboard

  descText: string = "This is a test";
  friends$: Profile[];
  posts$: Post[];

  submitPost() {
    if (this.postForm.valid) {
      let postText = new Post(null, this.postForm.controls['postText'].value, null);
      console.log(postText);
      this.postService.savePost<Post>(postText)
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
    this.buildFeed();
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

  like(id) {
    this.postService.getPostById<Post>(id)
    .subscribe(
      ()=>console.log("Liked")
    );
  }

  dislike(id){
    this.postService.getPostById(id)
    .subscribe(
      ()=>console.log("Disliked")
    );
  }
  buildFeed (){
    this.postService.getAllPosts()
              .subscribe(
                post => { this.posts$ = post }
              );
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
      this.buildFeed();
    // this.postService.fetch(this.backend.profile) // Fetching Username
    //   .subscribe(
    //     () => console.log(this.actRoute), // this.username = this.actRoute
    //     () => this.router.navigate(['login'])
    //   )
  }

}
