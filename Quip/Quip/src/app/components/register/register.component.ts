import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;


  onRegister = function (user) {
    console.log(user);
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      pass: new FormControl(),

    })
  }
}
