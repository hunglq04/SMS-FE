import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tổng quan',  icon: 'dashboard', class: '' },
    { path: '/employee', title: 'Nhân viên',  icon:'person', class: '' },
    { path: '/salon', title: 'Salon',  icon:'store', class: '' },
    { path: '/booking', title: 'Lịch đặt',  icon:'library_books', class: '' },
    { path: '/product', title: 'Sản phẩm',  icon:'bubble_chart', class: '' },
    { path: '/service', title: 'Dịch vụ',  icon:'bubble_chart', class: '' },
    { path: '/order', title: 'Đơn hàng',  icon:'library_books', class: '' },
    { path: '/notifications', title: 'Khách hàng',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
