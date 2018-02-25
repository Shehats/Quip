import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;


  onSubmit = function (user) {
    console.log(user);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      pass: new FormControl()
    })
  }
}
