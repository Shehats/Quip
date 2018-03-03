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
  // Form group creates an object that maps to a form in in html:
  // the way you'd map to an element of the form is by by using formControlName="whatever"
  loginForm: FormGroup;

  emailField: boolean;
  passField: boolean;
  
  constructor(private auth: AuthService,
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
  
  validateEmail(){
    if (!this.loginForm.controls['email'].valid){
      this.emailField = true;
    } else
    this.emailField = false;
  }
  validatePass(){
    if (!this.loginForm.controls['password'].valid){
      this.passField = true;
    } else
    this.passField = false;
  }

  onSubmit() {
    /// This is the on submit that was referenced in in the form html
    // first check if the form is valid; if so accept.
    if (this.loginForm.valid) {
      this.auth.login({
        username: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }).subscribe(
        // The first one is upon success
        // The second is upon failure.
        _ => this.router.navigate(['profile']),
        _ => this.loginForm.reset());
    }
  }
}
