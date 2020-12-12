import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stylist-scheduler',
  templateUrl: './stylist-scheduler.component.html',
  styleUrls: ['./stylist-scheduler.component.scss']
})
export class StylistSchedulerComponent implements OnInit {
  
  events: Event[] = [];
  event: any;

  constructor() { }

  ngOnInit(): void {
    this.event = 
    this.events.push(this.event)
  }
}