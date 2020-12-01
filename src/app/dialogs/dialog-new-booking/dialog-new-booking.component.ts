import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateTimePipe } from '../../pipe/date-time.pipe';
import { map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SalonService } from 'src/app/service/salon.service';

@Component({
  selector: 'app-dialog-new-booking',
  templateUrl: './dialog-new-booking.component.html',
  styleUrls: ['./dialog-new-booking.component.css']
})
export class DialogNewBookingComponent implements OnInit {

  formBooking: FormGroup;
  salonId = '';
  salons = [];
  services = [];
  times = [];
  stylists = [];
  filteredServices: Observable<any[]>;
  filteredSalons: Observable<any[]>;
  dateTime: string;

  constructor(
    public dialogRef: MatDialogRef<DialogNewBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateTimePipe: DateTimePipe,
    private formBuilder: FormBuilder,
    private salonService: SalonService
  ) {}

  ngOnInit() {
    this.getAllService();
    this.formBooking = this.formBuilder.group({
      salon: ['', Validators.required],
      time: ['', Validators.required],
      stylist: ['', Validators.required],
      services: [' ', Validators.required]
    })
    this.dateTime = this.dateTimePipe.transform(new Date);
    this.salons = this.data.salons;
    this.salonId = this.salons.length == 1 ? this.salons[0] : '';

    this.filteredSalons = this.formBooking.controls['salon'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.street),
            map(street => street ? this.filterSalon(street) : this.salons.slice())
          )
  }

  getAllService() {
    this.salonService.getAllService()
      .then(res => {
        this.services = res
        this.filteredServices = this.formBooking.controls['services'].valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterService(name) : this.services.slice())
        )
      })
      .catch(err => console.log(err))
  }

  filterSalon(street: string): any[] {
    const filterValue = street.toLowerCase();
    return this.salons.filter(option => 
      option.street.toLowerCase().includes(filterValue) || 
      option.district.toLowerCase().includes(filterValue) || 
      option.province.toLowerCase().includes(filterValue)
    );
  }

  filterService(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.services.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(option: any): string {
    return option ? `${option.street}, ${option.district}, ${option.province}` : '';
  }

  displayEmpty(option: any): string {
    return '';
  }

  onSalonChange(salonId) {
    this.salonId = salonId;
    let stylistSchedules = [];
    let allStylishResponses = this.salons.filter(el => el.id === salonId)[0].stylishResponses
    if (!allStylishResponses) this.times = [];
    else {
      allStylishResponses.map(el => Object.entries(el.stylishSchedule))
        .forEach(el => stylistSchedules = stylistSchedules.concat(el));
        let availableTime = stylistSchedules.filter(el => el[0] > '10:00' 
                                && el[1]).map(el => el[0]);
        this.times = [...new Set(availableTime)].sort();
    }
  }

  onSelectTime() {
    let time = this.formBooking.get('time').value;
    this.stylists = this.salons.filter(el => el.id === this.salonId)[0].stylishResponses
            .filter(el => el.stylishSchedule['10:00']).map(el => el.name)
  }

  onServiceSelected(serviceId) {
    alert(serviceId)
  }

}
