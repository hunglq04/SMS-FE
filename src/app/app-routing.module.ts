import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalonsComponent } from './salons/salons.component';
import { SalonDetailComponent } from './salon-detail/salon-detail.component';
import { AuthGuardService } from './service/auth-guard.service';
import { BookingComponent } from './booking/booking.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { EmployeeComponent } from './employee/employee.component';
import { OrderComponent } from './order/order.component';

const routes: Routes =
  [
    { path: 'login', component: LoginAdminComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuardService] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'salon', component: SalonsComponent, canActivate: [AuthGuardService] },
    { path: 'salon/:id', component: SalonDetailComponent, canActivate: [AuthGuardService] },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuardService] },
    { path: 'product', component: ProductsComponent, canActivate: [AuthGuardService] },
    { path: 'service', component: ServicesComponent, canActivate: [AuthGuardService] },
    { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuardService] },
    { path: 'order', component: OrderComponent, canActivate: [AuthGuardService] },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
