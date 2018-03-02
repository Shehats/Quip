import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Backend } from '../Interfaces/Backend'
import { ActionsService } from '../services/http/actions.service';

@Component({
  selector: 'app-forgot-password-confirmation',
  templateUrl: './forgot-password-confirmation.component.html',
  styleUrls: ['./forgot-password-confirmation.component.scss']
})
export class ForgotPasswordConfirmationComponent implements OnInit {
  forgotPasswordConfirmation;
  backend:Backend = new Backend();
  constructor(private active: ActivatedRoute,
              private actions: ActionsService,
              private router: Router) { }

  ngOnInit() {
    // this.forgotPasswordConfirmation = this.formBuilder.group({
    //      passwords: this.formBuilder.group({
    //          password: ['', [Validators.required]],
    //          passwordconf: ['', [Validators.required]],
    //      }, {validator: this.passwordConfirming}),
    //
    //  });
    this.forgotPasswordConfirmation = new FormGroup({
      password: new FormControl("", Validators.compose([
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.required
      ])),
      // passwordconf: new FormControl("", Validators.compose([
      //   Validators.pattern(),
      //   Validators.required
      // ])),

    });
  }
  onSubmitReset() {

    console.log(this.forgotPasswordConfirmation.value["password"]);
    console.log(this.active.url.value[1].path);
    this.actions.save<any>(this.backend.baseUrl + "/forget-password",{token: this.active.url.value[1].path,
                          password: this.forgotPasswordConfirmation.value["password"]})
                          .subscribe(
                            _=> this.router.navigate(['login']),
                            _=> console.log("derp")
                          );

  }


}
