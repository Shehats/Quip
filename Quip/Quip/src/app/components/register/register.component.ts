import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor (private auth: AuthService,
               private router: Router) { }

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

  onSubmit() {
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
