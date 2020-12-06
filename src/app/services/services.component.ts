import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewServiceComponent } from '../dialogs/dialog-new-service/dialog-new-service.component';
import { ServiceService } from '../service/service.service';
import { Service } from '../model/service.model';
import { Page } from '../model/page.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any;
  page: Page;
  pageOffset = 0;
  constructor(
    public dialog: MatDialog,
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    this.getService();
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(DialogNewServiceComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getService() {
    return this.serviceService.getService()
      .then(res => {
        this.services = res;
      })
  }
  deleteService(id) {
    this.serviceService.deleteService(id)
      .then(res => console.log(res))
    window.location.reload();
  }

}
