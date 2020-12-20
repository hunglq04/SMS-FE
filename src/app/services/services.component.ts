import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewServiceComponent } from '../dialogs/dialog-new-service/dialog-new-service.component';
import { ServiceService } from '../service/service.service';
import { Service } from '../model/service.model';
import { Page } from '../model/page.model';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any;
  page: Page;
  constructor(
    public dialog: MatDialog,
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    this.getService(0);
  }
  openDialog(service) {
    const dialogRef = this.dialog.open(DialogNewServiceComponent, {
      data: service
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getService(pageOffset) {
    return this.serviceService.getService(pageOffset, environment.pageSize)
      .then(res => {
        this.services = res["content"];
        this.page = new Page(res);
      })
  }

  pageChange(page) {
    this.getService(page);
  }

  deleteService(id) {
    this.serviceService.deleteService(id)
      .then(res => console.log(res))
    window.location.reload();
  }

}
