import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-dialog-stylist-working',
  templateUrl: './dialog-stylist-working.component.html',
  styleUrls: ['./dialog-stylist-working.component.css']
})
export class DialogStylistWorkingComponent implements OnInit {

  bookingInfo: any;
  image1 = null;
  image2 = null;
  image3 = null;
  image4 = null;
  showDemo = false;

  constructor(
    public dialogRef: MatDialogRef<DialogStylistWorkingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookingService: BookingService,
  ) { }

  ngOnInit(): void {
    this.bookingInfo = this.data.bookingInfo;
  }

  getImage1(imageUrl) {
    this.image1 = imageUrl
  }

  getImage2(imageUrl) {
    this.image2 = imageUrl
  }

  getImage3(imageUrl) {
    this.image3 = imageUrl
  }

  getImage4(imageUrl) {
    this.image4 = imageUrl
  }

  isShowStart(start) {
    console.log("Check", start);
    return (this.bookingInfo.status === 'WAITING' && start <= new Date()) || this.showDemo;
  }

  isShowCancel(start) {
    return (this.bookingInfo.status === 'WAITING');
  }

  startProgress(bookingId) {
    this.bookingService.startProgress(bookingId)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  finishProgress(bookingId) {
    this.bookingService.finishProgress(bookingId, this.image1, this.image2, this.image3, this.image4)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  cancelBooking(bookingId) {
    if(confirm("Bạn có muốn hủy lịch")) {
      this.bookingService.cancelBooking(bookingId)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
  }

}
