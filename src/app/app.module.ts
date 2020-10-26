//Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';

//Services
import { AuthenticationService } from './service/authentication.service';
import { AuthGuardService } from './service/auth-guard.service';
import { LoadingService } from './loading/loading.service';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { AddressService } from './service/address.service';


//Material components
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 

//Components
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingComponent } from './loading/loading.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SalonsComponent } from './salons/salons.component';
import { SalonDetailComponent } from './salon-detail/salon-detail.component';
import { DialogNewSalonComponent } from './dialogs/dialog-new-salon/dialog-new-salon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    DashboardComponent,
    LoadingComponent,
    SidebarComponent,
    NavbarComponent,
    SalonsComponent,
    SalonDetailComponent,
    DialogNewSalonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    LoadingService,
    AddressService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
