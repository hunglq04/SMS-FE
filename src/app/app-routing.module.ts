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

const routes: Routes =
  [
    { path: 'schedule', component: StylistSchedulerComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginAdminComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuardService, AuthAdminService] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService, AuthAdminService] },
    { path: 'salon', component: SalonsComponent, canActivate: [AuthGuardService] },
    { path: 'salon/:id', component: SalonDetailComponent, canActivate: [AuthGuardService] },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuardService] },
    { path: 'product', component: ProductsComponent, canActivate: [AuthGuardService, AuthAdminService] },
    { path: 'service', component: ServicesComponent, canActivate: [AuthGuardService, AuthAdminService] },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
