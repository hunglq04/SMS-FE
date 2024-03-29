import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewSalonComponent } from '../dialogs/dialog-new-salon/dialog-new-salon.component';
import { SalonService } from '../service/salon.service';
import { Page } from '../model/page.model';
import { environment } from '../../environments/environment';
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
  ) { }

  ngOnInit(): void {
    this.getSalon(0);
  }

  openDialog(salon) {
    const dialogRef = this.dialog.open(DialogNewSalonComponent, {
      data: salon
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getSalon(pageOffset) {
    this.salonService.getSalon(pageOffset, environment.pageSize).then(res => {
      this.salons = res["content"];
      this.page = new Page(res);
    })
  }

  pageChange(page) {
    this.getSalon(page);
  }

}
