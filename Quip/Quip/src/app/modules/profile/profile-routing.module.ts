import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Local Components
import { ProfileComponent } from '../../components/profile/profile.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent }

  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
