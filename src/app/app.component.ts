import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isShowContentOnly: boolean;

  constructor(private router: Router) {
  }

  ngDoCheck() {
    this.isShowContentOnly = this.router.url.includes('/login');
  }

}
