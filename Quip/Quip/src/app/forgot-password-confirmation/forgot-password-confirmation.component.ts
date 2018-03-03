import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Account } from '../models/Account';

@Component({
  selector: 'app-forgot-password-confirmation',
  templateUrl: './forgot-password-confirmation.component.html',
  styleUrls: ['./forgot-password-confirmation.component.scss']
})
export class ForgotPasswordConfirmationComponent implements OnInit {
  forgotPasswordConfirmation;
  account:Account;
  constructor(private active: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit () {
    this.forgotPasswordConfirmation = new FormGroup({
      password: new FormControl("", Validators.compose([
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.required
      ])),
      passwordconf: new FormControl("", Validators.compose([
        Validators.pattern("/^"+(this.forgotPasswordConfirmation.value["password"])?
                            this.forgotPasswordConfirmation.value["password"]: ''+"$/"),
        Validators.required
      ]))
    });
  }

  onSubmitReset() {
    this.auth.updatePassword(this.active.snapshot.params.token, this.forgotPasswordConfirmation.value["password"]);
  }

}
