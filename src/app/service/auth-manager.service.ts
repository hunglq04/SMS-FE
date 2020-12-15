import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthManagerService implements CanActivate {

  role: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.role = this.authenticationService.extractUserRole();
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url = this.router.getCurrentNavigation().extractedUrl.toString()
    if ((this.role === environment.ROLE_ADMIN) || (this.role === environment.ROLE_MANAGER)) {
      return true;
    }
    if (url === '/') {
      switch(this.role) {
        case environment.ROLE_STYLIST:
          this.router.navigateByUrl('/schedule')
          return false;
        case environment.ROLE_CASHIER:
          this.router.navigateByUrl('/salon')
          return false;
      }
    }
    this.router.navigateByUrl('/invalid-permission');
    return false;
  }
}