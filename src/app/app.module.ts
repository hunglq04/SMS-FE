//Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';

//Services
import { AuthenticationService } from './service/authentication.service';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-http-interceptor.service';
import { AuthGuardService } from './service/auth-guard.service';

//Components
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    DashboardComponent,
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
    BasicAuthHttpInterceptorService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
