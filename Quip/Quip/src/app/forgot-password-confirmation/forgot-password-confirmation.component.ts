import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { Account } from '../models/Account';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password-confirmation',
  templateUrl: './forgot-password-confirmation.component.html',
  styleUrls: ['./forgot-password-confirmation.component.scss']
})
export class ForgotPasswordConfirmationComponent implements OnInit {
  forgotPasswordConfirmation;
  account:Account;
  constructor(private active: ActivatedRoute,
            private authService:AuthService) { }

  ngOnInit () {
    this.forgotPasswordConfirmation = new FormGroup({
      password: new FormControl("", Validators.compose([
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.required
      ])),
    });
  }

  onSubmitReset() {
    this.authService.updatePassword(this.active.snapshot.params.token, this.forgotPasswordConfirmation.value["password"]);
  }


}
