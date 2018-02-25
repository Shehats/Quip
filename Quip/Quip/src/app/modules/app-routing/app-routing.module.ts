// Modules
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from '../../typescripts/free';



//Components
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { SplashComponent } from '../../components/splash/splash.component';
// import { ProfileComponent } from '../../components/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
]

@NgModule({
  declarations:[
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    SplashComponent  
  ],
  imports: [RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA]

})
export class AppRoutingModule { }
