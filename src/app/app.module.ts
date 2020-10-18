import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AuthenticationService } from './service/authentication.service';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService, 
    BasicAuthHttpInterceptorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
