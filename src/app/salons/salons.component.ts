import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogNewSalonComponent } from '../dialogs/dialog-new-salon/dialog-new-salon.component';
import { SalonService } from '../service/salon.service';
import { Page } from '../model/page.model';
@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css']
})
export class SalonsComponent implements OnInit {

  salons = [];
  page: Page;
  
  constructor(
    public dialog: MatDialog,
    public salonService: SalonService,
  ) {}

  ngOnInit(): void {
     this.getSalon(0);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogNewSalonComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getSalon(pageOffset) {
    this.salonService.getSalon(pageOffset, 3).then(res => {
      this.salons = res["content"];
      this.page = new Page(res);
    })
  }

  pageChange(page) {
    this.getSalon(page);
  }

}
