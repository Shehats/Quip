import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor (private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.required
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"),
      ]))
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login({
        username: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }).subscribe(
        _ => this.router.navigate(['profile']),
        _ => this.loginForm.reset());
    }
  }
}
