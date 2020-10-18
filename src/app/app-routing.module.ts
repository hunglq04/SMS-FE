import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = 
[
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginAdminComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
