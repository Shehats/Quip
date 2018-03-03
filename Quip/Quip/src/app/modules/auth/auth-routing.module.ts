import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Local Components
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { ProfileComponent } from '../../components/profile/profile.component'
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
