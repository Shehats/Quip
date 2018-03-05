import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
// import { Account } from '../../models/Account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private auth: AuthService,
    private router: Router) { }

  requiredFields: boolean;
  passwordField: boolean;
  emailField: boolean;
  lnameField: boolean;
  fnameField: boolean;
  usernameField: boolean;

  invlidUsername: boolean;
  invlidEmail: boolean;

  ngOnInit() {
    this.registerForm = new FormGroup({
      fname: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      lname: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      username: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"),
      ])),
    })
  }

  // compareUsername() {
  //   let account = new Account(null, this.registerForm.controls['username'].value, null, null, null, null);
  //   this.auth.checkAccount(account)
  //   if (this.registerForm.controls['username'].value ==
  //      {
  //       this.invlidUser = false;
  //     } else {
  //       this.invlidUser = true;
  //   }
  // }

  // compareEmail() {
  //   if (this.registerForm.controls['username'].value ==
  //     this.auth.checkAccount(new Account(null, null, null, null, null, this.registerForm.controls['email'].value)).email) {
  //       this.invlidEmail = false;
  //     } else {
  //       this.invlidEmail = true;
  //   }
  // }

  validatePassword() {
    if (!this.registerForm.controls['password'].valid){
      this.passwordField = true;
    } else {
      this.passwordField = false;
    }
  }

  validateFname() {
    if (!this.registerForm.controls['fname'].valid) {
      this.fnameField = true;
    } else {
      this.fnameField = false;
    }
  }

  validateLname() {
    if (!this.registerForm.controls['lname'].valid) {
      this.lnameField = true;
    } else {
      this.lnameField = false;
    }
  }
  validateEmail() {
    if (!this.registerForm.controls['lname'].valid) {
      this.emailField = true;
    } else {
      this.emailField = false;
    }
  }
  validateUsername() {
    if (!this.registerForm.controls['username'].valid) {
      this.usernameField = true;
    } else {
      this.usernameField = false;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.auth.register({
        username: this.registerForm.controls['username'].value,
        fname: this.registerForm.controls['fname'].value,
        lname: this.registerForm.controls['lname'].value,
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value
      }).subscribe(_ => this.router.navigate(['profile']),
        _ => this.registerForm.reset());
    }
  }
}
