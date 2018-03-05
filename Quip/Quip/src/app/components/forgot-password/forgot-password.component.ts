import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService  } from 'app/services/auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword;
  @Input() sent:boolean = false;
  email: string;
  constructor(private router: Router,
            private authService: AuthService){}

  onSendRequest(user) {
    this.email = user["email"];
   this.authService.forgetPassword(this.email)
                    .subscribe(
                    _=>this.sent=true,
                    _=>console.log("Error")
                  );
  }

  toLogin(){
    this.router.navigate(['login']);
  }

  isSent() {
    return this.sent;
  }

  ngOnInit() {
    this.forgotPassword = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.required
      ])),

    })
  }
}
