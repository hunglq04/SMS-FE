//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppFirebaseModule } from './app-firebase.module';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

//Services
import { AuthenticationService } from './service/authentication.service';
import { AuthGuardService } from './service/auth-guard.service';
import { LoadingService } from './loading/loading.service';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { AddressService } from './service/address.service';
import { UtilsService } from './service/utils.service';
import { StorageService } from './service/storage.service';
import { EmployeeService } from './service/employee.service';
import { SalonService } from './service/salon.service';
import { BookingService } from './service/booking.service';
import { ProductService } from './service/product.service';
import { ServiceService } from './service/service.service';
import { AuthAdminService } from './service/auth-admin.service';

//Material components
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

//Custom pipe
import { TotalServicePricePipe } from './pipe/total-service-price.pipe';
import { SalonAddressPipe } from './pipe/salon-address.pipe';
import { DateTimePipe } from './pipe/date-time.pipe';

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
import { UploadImageComponent } from './upload-image/upload-image.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NotificationComponent } from './notification/notification.component';
import { BookingComponent } from './booking/booking.component';
import { DialogNewBookingComponent } from './dialogs/dialog-new-booking/dialog-new-booking.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { DialogNewProductComponent } from './dialogs/dialog-new-product/dialog-new-product.component';
import { DialogNewServiceComponent } from './dialogs/dialog-new-service/dialog-new-service.component';
import { DialogBillInfoComponent } from './dialogs/dialog-bill-info/dialog-bill-info.component';
import { StylistSchedulerComponent } from './stylist-scheduler/stylist-scheduler.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { DialogStylistWorkingComponent } from './dialogs/dialog-stylist-working/dialog-stylist-working.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    TotalServicePricePipe,
    SalonAddressPipe,
    DateTimePipe,
    AppComponent,
    LoginAdminComponent,
    DashboardComponent,
    LoadingComponent,
    SidebarComponent,
    NavbarComponent,
    SalonsComponent,
    SalonDetailComponent,
    DialogNewSalonComponent,
    UploadImageComponent,
    PaginationComponent,
    NotificationComponent,
    BookingComponent,
    DialogNewBookingComponent,
    ProductsComponent,
    ServicesComponent,
    DialogNewProductComponent,
    DialogNewServiceComponent,
    DialogBillInfoComponent,
    StylistSchedulerComponent,
    SchedulerComponent,
    DialogStylistWorkingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppFirebaseModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MaterialFileInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    DateInputsModule,
    SchedulerModule
  ],
  providers: [
    DateTimePipe,
    DatePipe,
    AuthenticationService,
    AuthGuardService,
    LoadingService,
    AddressService,
    UtilsService,
    StorageService,
    EmployeeService,
    SalonService,
    ProductService,
    ServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    BookingService,
    AuthAdminService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
