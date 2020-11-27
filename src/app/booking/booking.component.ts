import { Component, OnInit } from '@angular/core';
import { Page } from '../model/page.model';
import { BookingService } from '../service/booking.service';
import { DatePipe } from '@angular/common';
import { SalonService } from '../service/salon.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  fromDate: string;
  bookings = [];
  page: Page;
  pageOffset = 0;
  salonCtrl = new FormControl();
  salonId = '';
  salons = [];
  filteredSalons: Observable<any[]>;;


  constructor(
    private bookingService: BookingService,
    private salonService: SalonService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.fromDate = this.datePipe.transform(Date.now(),'yyyy-MM-ddThh:MM:ss');
    this.getSalonByManager();
    this.getBookingPage();
  }

  getBookingPage() {
    this.bookingService.getBooking(this.pageOffset, 3, this.fromDate, this.salonId)
      .then(res => {
        this.bookings = res["content"]
        this.page = new Page(res)
      })
      .catch(err => console.log(err));
    
  }

  pageChange(page) {
    this.pageOffset = page;
    this.getBookingPage();
  }

  getSalonByManager() {
    this.salonService.getSalonByManager()
      .then(res => {
        this.salons = res;
        this.filteredSalons = this.salonCtrl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.street),
            map(street => street ? this.filterSalon(street) : this.salons.slice())
          )
    })
      .catch(err => console.log(err))
  }

  filterSalon(street: string): any[] {
    const filterValue = street.toLowerCase();
    return this.salons.filter(option => option.street.toLowerCase().includes(filterValue));
  }

  displayFn(option: any): string {
    return option && option.street ? option.street : '';
  }

  onSalonChange(salonId) {
    this.salonId = salonId;
    this.getBookingPage();
  }

}
