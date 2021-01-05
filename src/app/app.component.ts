import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from './service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isShowContentOnly: boolean;

  constructor(private router: Router, private messagingService: MessagingService) {
  }

  ngOnInit() {
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
   }

  ngDoCheck() {
    this.isShowContentOnly = this.router.url.includes('/login');
  }

}
