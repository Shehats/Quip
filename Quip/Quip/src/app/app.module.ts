import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from './typescripts/free';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchPipe } from './pipes/search.pipe';
import { ReqInterceptorService } from './services/interceptors/req-interceptor.service';
import { ActionsService } from './services/http/actions.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: ReqInterceptorService, 
      multi: true 
    },
    ActionsService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
