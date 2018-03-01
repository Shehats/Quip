import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionsService } from '../../services/http/actions.service';
import { Backend } from '../../Interfaces/Backend';
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  backend:Backend = new Backend();
  forgotPassword;
  email: string;
  constructor(private actions: ActionsService){}

  onSendRequest = function (user) {
    console.log(user["email"]);
    this.email = user["email"];
    this.actions.fetch<any>(this.backend.baseUrl + `/forget-password/${this.email}`)
    .subscribe(
      _=>console.log("Yay"),
      _=>console.log("Aww")
    );
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
