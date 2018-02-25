
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Used Components
import { SplashComponent } from './components/splash/splash.component';

const routes: Routes = [
  { path: '', component: SplashComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }