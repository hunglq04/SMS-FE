import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthAdminService implements CanActivate {

  role: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.role = this.authenticationService.extractUserRole();
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url = this.router.getCurrentNavigation().extractedUrl.toString()
    if (this.role === environment.ROLE_ADMIN) {
      return true;
    }
    if (this.role === environment.ROLE_STYLIST && (url === '/dashboard' || url === '/')) {
      this.router.navigateByUrl('/schedule')
      return false;
    }
    // this.router.navigateByUrl('/login');
    alert(url)
    return false;
  }
}