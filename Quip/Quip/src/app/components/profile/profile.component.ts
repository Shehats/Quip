import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActionsService } from '../../services/http/actions.service';
import { Backend } from '../../Interfaces/Backend';
import { Profile } from '../../models/Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  backend: Backend = new Backend();
  profile: Profile;
  constructor(private actions: ActionsService,
              private router: Router) { }

  ngOnInit() {
    this.actions.fetch(this.backend.profile).subscribe(
      ()=> console.log("Insert actions on successful profile navigation here."),
      ()=>this.router.navigate(['login']));
  }

}
