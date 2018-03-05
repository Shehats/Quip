import { Injectable } from '@angular/core';
import { account } from '../../Interfaces/Backend';
import { Account } from '../../models/Account';
import { ActionsService } from '../http/actions.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {
  constructor(private actions: ActionsService) { }

  public getAllAccounts(): Observable<Account[]> {
    return this.actions.fetchAll<Account>(account)
    .map(x => x.map(y => new Account(y['number'], y['username'], y['fname'], y['lname'], y['profilePic'], y['email'])))
  }

}
