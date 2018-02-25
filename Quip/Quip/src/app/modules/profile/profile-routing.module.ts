import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Local Components
import { ProfileComponent } from '../../components/profile/profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
