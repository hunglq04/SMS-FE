import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventStyleArgs } from '@progress/kendo-angular-scheduler';
import { DialogStylistWorkingComponent } from '../dialogs/dialog-stylist-working/dialog-stylist-working.component';
import { DateTimePipe } from '../pipe/date-time.pipe';
import { UtilsService } from '../service/utils.service';
    
export interface Event {
  id: number;
  title: string;
  services: string;
  customer: string;
  start: Date;
  end: Date;
  status: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  
  @Input() events: Event[];
  @Output() dateChange = new EventEmitter<string>();
  startTime = '8:00';
  selectedDate = new Date();
  currentTime = this.dateTimePipe.transform(this.utilsService.addHoursToDate(new Date(), -1)).split('T')[1];
  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    public dateTimePipe: DateTimePipe,
    public utilsService: UtilsService,
  ) {}

  ngOnInit() {
  }

  eventClick(e) {
    const dialogRef = this.dialog.open(DialogStylistWorkingComponent, {
      width: '500px',
      height: 'auto',
      data: {bookingInfo: e.event.dataItem}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dateChange.emit(this.datePipe.transform(this.selectedDate, "yyyy-MM-dd"))
      }
    });
    console.log(e.event)
  }

  getEventClass = (args: EventStyleArgs) => {
    return args.event.dataItem.status?.toLowerCase();
  }

  changeDate(event) {
    this.selectedDate = event.selectedDate;
    this.dateChange.emit(this.datePipe.transform(event.selectedDate, "yyyy-MM-dd"))
  }
}