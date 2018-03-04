import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../models/Account';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  @Input('accounts') accounts: Account[];
  @Input('obsAccounts') accounts$: Observable<Account[]>;
  @Input('searchArg') searchArg: string;

  constructor(private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  addFriend(account: Account) {
    this.profileService.addFriend(account.username)
    .subscribe(
      _ => location.reload()
     );
  }

  unFriend (account: Account) {
    this.profileService.unFriend(account.username)
    .subscribe(
      _ => location.reload()
     );
  }

  visit (account: Account) {
    this.router.navigate(['profile', account.username]);
  }
}
