import { Component, OnInit } from '@angular/core';
import { Page } from '../model/page.model';
import { OrderService } from 'src/app/service/order.service';
import { DateTimePipe } from '../pipe/date-time.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderInfoComponent } from 'src/app/dialogs/dialog-order-info/dialog-order-info.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  fromDate: string;
  orders: [];
  order: any;
  page: Page;
  pageOffset = 0;
  pageSize = 5;
  orderDetail = [];
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private dateTimePipe: DateTimePipe,
  ) { }

  async ngOnInit() {
    this.fromDate = this.dateTimePipe.transform(new Date());
    this.getAllOrder();
  }
  getAllOrder() {
    this.orderService.getOrder(this.pageOffset, this.pageSize, this.fromDate)
      .then(res => {
        this.orders = res['content'];
        this.page = new Page(res)
        // alert(JSON.stringify(this.orders))
      })
      .catch(err => console.log(err));
  }
  getOrderDetail(orderId) {
    this.orderService.getOrderDetail(orderId)
      .then(res => {
        this.order = res;
      })
      .catch(err => console.log(err.status));

  }

  pageChange(page) {
    this.pageOffset = page;
    this.getAllOrder();
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(DialogOrderInfoComponent, {
      width: '500px',
      height: 'auto',
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
