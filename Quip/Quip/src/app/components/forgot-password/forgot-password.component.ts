import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionsService } from '../../services/http/actions.service';
import { baseUrl } from '../../Interfaces/Backend';
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
  constructor(private actions: ActionsService,
              private router: Router){}

  onSendRequest(user) {
    this.email = user["email"];
    this.actions.fetch<any>(baseUrl + `/forget-password/${this.email}`)
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