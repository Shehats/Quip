import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { ActionsService } from '../../services/http/actions.service';
import { Observable } from 'rxjs/Observable';
import { Account } from '../../models/Account';
import { Backend } from '../../Interfaces/Backend';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  accounts$: Observable<Account[]>;
  searchArg: string;
  backend: Backend = new Backend();

  constructor(private auth: AuthService,
              private actions: ActionsService) { }

  LogOut() {
    this.auth.logout();
  }

  ngOnInit() {
    this.accounts$ = this.actions.fetchAll<Account>(this.backend.account)
    .map(y => y.map(x => new Account(x['id'], x['username'], x['fname'], x['lname'], x['profilePic'], x['email'])));
  }

}
