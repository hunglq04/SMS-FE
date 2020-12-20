import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from 'src/app/service/booking.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-dialog-bill-info',
  templateUrl: './dialog-bill-info.component.html',
  styleUrls: ['./dialog-bill-info.component.css']
})
export class DialogBillInfoComponent implements OnInit {

  services: [];
  customer: any;
  walkInGuest = '';
  address = '';
  status = '';

  constructor(
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void {
    this.status = this.data.billInfo.bookingStatus
    this.services = this.data.billInfo.services;
    this.customer = this.data.billInfo.customer;
    this.walkInGuest = this.data.billInfo.walkInGuest;
    this.address = `${this.data.billInfo.salon.street}, ${this.data.billInfo.salon.ward}, ${this.data.billInfo.salon.district}, ${this.data.billInfo.salon.province}`;
    console.log(this.data.billInfo);
  }

  printPdf() {
    this.bookingService.postInvoice(this.data.billInfo.bookingId)
      .then(billId => {
        let data = {
          customerName: this.customer?.name || this.walkInGuest,
          email: this.customer?.email,
          contactNo: this.customer?.phone,
          services: this.services,
          address: this.address,
          billNo: billId
        };
        this.utilsService.previewPdfFile(data);
      })
      .catch(err => this.utilsService.showNotification("error_outline", "Có lỗi xãy ra!", "danger", "top", "center"));
  }

}
