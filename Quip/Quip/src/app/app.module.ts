import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SearchPipe } from './pipes/search.pipe';
import { ReqInterceptorService } from './services/interceptors/req-interceptor.service';
import { ActionsService } from './services/http/actions.service';
import { AuthService } from './services/auth/auth.service';
import { CacheService } from './services/cache/cache.service';
import { MDBBootstrapModule } from './typescripts/free';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Local modules
import { ProfileModule } from './modules/profile/profile.module';
<<<<<<< HEAD
import { AuthModule } from './modules/auth/auth.module';
import { ForgotPasswordConfirmationComponent } from './forgot-password-confirmation/forgot-password-confirmation.component';
=======
import { AuthModule } from './modules/auth/auth.module';
import { FileUploadService } from './services/file-upload/file-upload.service';
>>>>>>> 8676cd039de78eb5969a853e7db46bed9ae9f73e

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ForgotPasswordConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    ProfileModule,
    AuthModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: ReqInterceptorService,
      multi: true
    },
    CacheService,
    ActionsService,
    AuthService,
    FileUploadService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
