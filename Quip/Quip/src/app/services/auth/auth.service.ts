import { Injectable } from '@angular/core';
import { CacheService } from '../cache/cache.service';
import { ActionsService } from '../http/actions.service';
import { Observable } from 'rxjs/Observable';
import { Backend } from '../../Interfaces/Backend';
import { Profile } from '../../models/Profile';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  backend: Backend = new Backend();
  constructor(private actions: ActionsService,
              private cache: CacheService,
              private router: Router
              ) { }

  // Takes an account of any form username and password are a must.
  public register(account: any): Observable<any> {
    return this.actions.save<any>(this.backend.signUp,account);
  }

  // Takes an account of any form username or email and password are a must.
  public login(account: any): Observable<Profile> {
    return this.actions.save<any>(this.backend.signIn,account);
  }

  public logout(): void {
    console.log('erhjerejh')
    this.cache.removeToken().subscribe(_ => this.router.navigate(['']))
  }

  public checkAccount(account: Account): Observable<any> {
    return this.actions.save<any>(this.backend.exists, account);
  }
}
