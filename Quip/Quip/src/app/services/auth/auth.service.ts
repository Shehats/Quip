import { Injectable } from '@angular/core';
import { CacheService } from '../cache/cache.service';
import { ActionsService } from '../http/actions.service';
import { Observable } from 'rxjs/Observable';
import { signUp, signIn, exists, forgetPassword, updatePassword } from '../../Interfaces/Backend';
import { Profile } from '../../models/Profile';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private actions: ActionsService,
              private cache: CacheService,
              private router: Router
              ) { }

  public register(account: any): Observable<any> {
    return this.actions.save<any>(signUp,account);
  }

  // Takes an account of any form username or email and password are a must.
  public login(account: any): Observable<Profile> {
    return this.actions.save<any>(signIn,account);
  }

  public logout(): void {
    this.cache.removeToken().subscribe(_ => this.router.navigate(['login']));
  }

  public checkAccount(account: Account): Observable<any> {
    return this.actions.save<any>(exists, account);
  }

  public forgetPassword(email: string): Observable<void> {
    return this.actions.fetch<any>(forgetPassword + email);
  }

  public updatePassword(token: string, password: string): void{
    let updateForm = {
      token: token,
      password: password
    };
    this.actions.save<any>(updatePassword, updateForm).subscribe(_ => this.router.navigate(['login']));
  }
}
