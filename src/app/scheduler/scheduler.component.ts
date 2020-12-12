import { Component, OnInit, Input } from '@angular/core';
    
export interface Event {
  Title: String;
  Description: String;
  Start: Date;
  End: Date;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  constructor() { }
  @Input() events: Event[];
  startTime = '7:00';
  selectedDate = new Date();
  ngOnInit() {
  }
}