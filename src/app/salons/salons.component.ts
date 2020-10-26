import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogNewSalonComponent } from '../dialogs/dialog-new-salon/dialog-new-salon.component';

@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css']
})
export class SalonsComponent implements OnInit {

  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogNewSalonComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
