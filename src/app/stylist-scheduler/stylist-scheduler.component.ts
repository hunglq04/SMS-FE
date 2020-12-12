import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Event } from '../scheduler/scheduler.component';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'stylist-scheduler',
  templateUrl: './stylist-scheduler.component.html',
styleUrls: ['./stylist-scheduler.component.scss']
})
export class StylistSchedulerComponent implements OnInit, OnChanges {
  
  events: Event[] = [];
  selectedDate = new Date();
  event: Event = {
    id: 1,
    title: 'Breakfast',
    description: '123123213 \n asdfasdfds \n asdasd ',
    start: new Date(),
    end: new Date(),
    status: 'as'
  };

  event1: Event = {
    id: 1,
    title: 'Breakfast (morning)',
    description: '123123213 \n asdfasdfds \n asdasd ',
    start: new Date('2020-12-12T09:00'),
    end: new Date('2020-12-12T10:00'),
    status: 'in_progress'
  };

  constructor(
    private employeeService: EmployeeService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(changes.selectedDate.currentValue);
  }

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      var dt = new Date();
      dt.setHours( dt.getHours() + i );
      this.event.end = dt;
      this.events.push(this.event)
      this.events.push(this.event1)
    }
  }

  getStylistScheduler(date) {
    this.employeeService.getStylistScheduler(date)
    .then(res => {
      this.events = []
      res.forEach(element => {
        this.events.push({
          id: element.id,
          title: element.title,
          description: element.description,
          start: new Date(element.start),
          end: new Date(element.end),
          status: element.status
        })
      });
      console.log(res);
    })
  }
  
  async dateChange(date) {
    await this.getStylistScheduler(date);
    await alert(this.events.length)
    await this.events.push(this.event1)
    await console.log("EVENT", this.events)
  }
  
}