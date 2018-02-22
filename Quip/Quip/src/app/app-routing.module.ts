import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Local modules
import { ProfileModule } from './modules/profile/profile.module';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  // { path: 'forgotPassword', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [
    ProfileModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
