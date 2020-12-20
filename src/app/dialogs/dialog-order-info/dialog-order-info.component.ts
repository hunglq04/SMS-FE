import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-dialog-order-info',
  templateUrl: './dialog-order-info.component.html',
  styleUrls: ['./dialog-order-info.component.css']
})
export class DialogOrderInfoComponent implements OnInit {
  order: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {

    this.getOrderDetail();
  }
  getOrderDetail() {
    this.orderService.getOrderDetail(this.data.id)
      .then(res => {
        this.order = res;
      })
      .catch(err => console.log(err.status));

  }

  confirmOrder(){
    this.orderService.confirmOrder(this.data.id);
    window.location.reload();
  }

  confirmCompletedOrder(){
    this.orderService.confirmCompledtedOrder(this.data.id);
    window.location.reload();
  }

}
