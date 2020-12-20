import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalonsComponent } from './salons/salons.component';
import { SalonDetailComponent } from './salon-detail/salon-detail.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthAdminService } from './service/auth-admin.service';
import { BookingComponent } from './booking/booking.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { StylistSchedulerComponent } from './stylist-scheduler/stylist-scheduler.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './employee/employee.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { InvalidPermissionComponent } from './invalid-permission/invalid-permission.component';

const routes: Routes =
  [
    //todo add route for permission error, internal error, not-found
    { path: 'error', component: InternalErrorComponent },
    { path: 'invalid-permission', component: InvalidPermissionComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'login', component: LoginAdminComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthAdminService, AuthGuardService] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthAdminService, AuthGuardService] },
    { path: 'salon', component: SalonsComponent, canActivate: [AuthGuardService] },
    { path: 'salon/:id', component: SalonDetailComponent, canActivate: [AuthGuardService] },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuardService] },
    { path: 'product', component: ProductsComponent, canActivate: [AuthAdminService, AuthGuardService] },
    { path: 'service', component: ServicesComponent, canActivate: [AuthAdminService, AuthGuardService] },
    { path: 'schedule', component: StylistSchedulerComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'employee', component: EmployeeComponent, canActivate: [AuthAdminService, AuthGuardService] },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
