import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventStyleArgs } from '@progress/kendo-angular-scheduler';
import { DialogStylistWorkingComponent } from '../dialogs/dialog-stylist-working/dialog-stylist-working.component';
    
export interface Event {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  status: string;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, OnChanges {
  
  @Input() events: Event[];
  @Output() dateChange = new EventEmitter<string>();
  startTime = '8:00';
  selectedDate = new Date();

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGE", this.events)
  }

  ngOnInit() {
  }

  eventClick(e) {
    const dialogRef = this.dialog.open(DialogStylistWorkingComponent, {
      width: '500px',
      height: 'auto',
      // data: {salons: this.salons}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
        
    //   }
    // });
    console.log(e)
  }

  

  getEventClass = (args: EventStyleArgs) => {
    return args.event.dataItem.status?.toLowerCase();
  }

  changeDate(event) {
    this.dateChange.emit(this.datePipe.transform(event.selectedDate, "yyyy-MM-dd"))
  }
}