import { Component, OnInit } from '@angular/core';
import { Event } from '../scheduler/scheduler.component';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'stylist-scheduler',
  templateUrl: './stylist-scheduler.component.html',
styleUrls: ['./stylist-scheduler.component.css']
})
export class StylistSchedulerComponent implements OnInit {

  events: Event[] = [];
  selectedDate = new Date();

  constructor(
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
  }

  getStylistScheduler(date) {
    this.employeeService.getStylistScheduler(date)
    .then(res => {
      this.events = []
      res.forEach(element => {
        let service = element.services.map(el => el.name).join(',')
        let title = `${service} - Khách hàng ${element.customer}`
        this.events.push({
          id: element.id,
          title: title,
          services: element.services,
          customer: element.customer,
          start: new Date(element.start),
          end: new Date(element.end),
          status: element.status,
          image1: element.image1,
          image2: element.image2,
          image3: element.image3,
          image4: element.image4
        })
      });
    }).catch(err => console.error(err))
  }

  dateChange(date) {
    this.getStylistScheduler(date);
  }

}
