import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from '../../typescripts/free';
import { ProfileRoutingModule } from './profile-routing.module';

// Local declarations
import { ProfileComponent } from '../../components/profile/profile.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    NavbarComponent,

  ]
})
export class ProfileModule { }
