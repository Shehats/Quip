import { Injectable } from '@angular/core';
import { CacheService } from '../cache/cache.service';
import { ActionsService } from '../http/actions.service';
import { Observable } from 'rxjs/Observable';
import { Backend } from '../../Interfaces/Backend';
import { Account } from '../../models/Account';
import { Profile } from '../../models/Profile';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  backend: Backend = new Backend();
  constructor(private actions: ActionsService,
              private cache: CacheService,
              private router: Router
              ) { }

  public register(account: Account): Observable<Profile> {
    return this.actions.save<Account>(this.backend.signUp,account)
    .flatMap(_ => this.actions.fetch<Profile>(this.backend.profile+'/'+account.username));
  }

  public login(account: Account): Observable<Profile> {
    return this.actions.save<Account>(this.backend.signIn,account)
    .flatMap(_ => this.actions.fetch<Profile>(this.backend.profile+'/'+account.username));
  }

  public logout() {
    this.cache.removeToken().subscribe(_ => this.router.navigate(['']))
  }
}
