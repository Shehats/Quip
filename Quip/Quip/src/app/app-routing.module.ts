import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Local modules
import { ProfileModule } from './modules/profile/profile.module';
const routes: Routes = [];

@NgModule({
  imports: [
  	ProfileModule,
  	RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
