import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../service/authentication.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles: string[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tổng quan',  icon: 'dashboard', class: '', roles: [environment.ROLE_ADMIN, environment.ROLE_MANAGER] },
    { path: '/employee', title: 'Nhân viên',  icon:'person', class: '', roles: [environment.ROLE_ADMIN, environment.ROLE_MANAGER] },
    { path: '/salon', title: 'Salon',  icon:'store', class: '', roles: [environment.ROLE_ADMIN, environment.ROLE_MANAGER] },
    { path: '/booking', title: 'Lịch đặt',  icon:'library_books', class: '', roles: [environment.ROLE_ADMIN, environment.ROLE_MANAGER, environment.ROLE_CASHIER] },
    { path: '/product', title: 'Sản phẩm',  icon:'shopping_bag', class: '', roles: [environment.ROLE_ADMIN, environment.ROLE_MANAGER] },
    { path: '/service', title: 'Dịch vụ',  icon:'bubble_chart', class: '', roles: [environment.ROLE_ADMIN, environment.ROLE_MANAGER] },
    { path: '/order', title: 'Đơn hàng',  icon:'library_books', class: '', roles: [environment.ROLE_ADMIN, environment.ROLE_MANAGER] },
    { path: '/schedule', title: 'Lịch làm việc',  icon:'date_range', class: '', roles: [environment.ROLE_STYLIST] },
    // { path: '/notifications', title: 'Khách hàng',  icon:'notifications', class: '', roles: [environment.R] },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  role: string;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.role = this.authService.extractUserRole();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
  logout() {
    this.authService.logOut();
  }
}
