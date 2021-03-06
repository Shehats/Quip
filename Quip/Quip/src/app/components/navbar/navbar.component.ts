import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { ActionsService } from '../../services/http/actions.service';
import { ProfileService } from '../../services/profile/profile.service';
import { Observable } from 'rxjs/Observable';
import { Account } from 'app/models/Account';
import { Profile } from 'app/models/Profile';
import { account } from '../../Interfaces/Backend';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output('stateMode') outgoingData = new EventEmitter<boolean>();

  constructor(private auth: AuthService, 
              private actions: ActionsService,
              private profileService: ProfileService
              ) { }

  accounts$: Observable<Account[]> = null;
  profile$: Observable<Profile>;
  searchArg: string;

  LogOut() {
    this.auth.logout();
  }

  ngOnInit() {
    this.accounts$ = this.actions.fetchAll<Account>(account)
                      .map(x => x.map(y => new Account(y['number'], y['username'], y['fname'], y['lname'], y['profilePic'], y['email'])));
    this.profile$ = this.profileService.getUserProfile();
  }

  public sendState(data: any) {
    this.outgoingData.emit(data);
  }
}



