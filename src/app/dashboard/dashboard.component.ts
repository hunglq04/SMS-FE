import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SalonService } from '../service/salon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  revenue = 0
  customers = 0
  completedOrders = 0
  newOrders = 0

  public series: any[] = [];
  public seriesSum: any[] = [];
  public categories: any[] = [];
  public series1: any[] = [];
  public series1Sum: any[] = [];
  public autofit = true;
  data: any[] = []
  data1: any[] = []

  currDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  monthYear = ''
  year = ''
  
  salonCtrl = new FormControl();
  salonId = '';
  salons = [];
  filteredSalons: Observable<any[]>;

  constructor( private salonService: SalonService, 
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit(): void {
    this.getSalonByManager();
    this.getSalonStatistic();
  }

  public labelContent(e: any): string {
    return `${e.category} (${e.value})`;
  }

  getSalonStatistic() {
    this.salonService.getSalonStatistic(this.salonId,this.date,this.monthYear, this.year)
      .then(res => {
        console.log(res)
        this.revenue = res.revenue
        this.customers = res.totalCustomer
        this.completedOrders = res.completedOrders
        this.newOrders = res.newOrders
        Object.entries(res.topServices).forEach(el => this.data.push({
          kind: el[0], share: el[1]
        }))
        Object.entries(res.topProducts).forEach(el => this.data1.push({
          kind: el[0], share: el[1]
        }))
        if (this.date) this.buildDataForWeekChart(res)
        else if (this.monthYear) this.buildDataForMonth(res);
        else if (this.year) this.buildDataForYear(res);
      })
      .catch(err => console.log(err))
  }

  buildDataForWeekChart(res) {
    this.categories = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    this.series = this.categories.map((el, index) => el = res.customerChart[index + 1] || 0);
    this.seriesSum = this.series.map((sum => value => sum += value)(0));
    this.series1 = this.categories.map((el, index) => el = res.orderChart[index + 1] || 0);
    this.series1Sum = this.series1.map((sum => value => sum += value)(0));
  }

  buildDataForMonth(res) {
    let date = this.monthYear.split('-');
    let totalDaysInMonth = new Date(Number.parseInt(date[0]), Number.parseInt(date[1]), 0).getDate();
    this.categories = Array.from(Array(totalDaysInMonth).keys()).map(x => x + 1)
    this.series = this.categories.map((el, index) => el = res.customerChart[index + 1] || 0);
    this.seriesSum = this.series.map((sum => value => sum += value)(0));
    this.series1 = this.categories.map((el, index) => el = res.orderChart[index + 1] || 0);
    this.series1Sum = this.series1.map((sum => value => sum += value)(0));
  }

  buildDataForYear(res) {
    this.categories = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    this.series = this.categories.map((el, index) => el = res.customerChart[index + 1] || 0);
    this.seriesSum = this.series.map((sum => value => sum += value)(0));
    this.series1 = this.categories.map((el, index) => el = res.orderChart[index + 1] || 0);
    this.series1Sum = this.series1.map((sum => value => sum += value)(0));
  }

  switchDate(value) {
    switch(value) {
      case 0: 
        this.date = this.currDate;
        this.monthYear = this.year = '';
        break;
      case 1:
        this.monthYear = this.currDate;
        this.date = this.year = '';
        break;
      default:
        this.year = this.currDate.split('-')[0];
        this.monthYear = this.date = '';
    }
    this.getSalonStatistic();
  }

  searchDateChange() {
    this.date = this.date ? this.date = this.currDate : '';
    this.monthYear = this.monthYear ? this.monthYear = this.currDate : '';
    this.year = this.year ? this.year = this.currDate.split('-')[0] : '';
    this.getSalonStatistic();
  }

  displayFn(option: any): string {
    return option ? `${option.street}, ${option.district}, ${option.province}` : '';
  }

  onSalonChange(salonId) {
    this.salonId = salonId;
    this.getSalonStatistic();
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
    }).catch(err => console.log(err))
  }

  filterSalon(street: string): any[] {
    const filterValue = street.toLowerCase();
    return this.salons.filter(option => 
      option.street.toLowerCase().includes(filterValue) || 
      option.district.toLowerCase().includes(filterValue) || 
      option.province.toLowerCase().includes(filterValue)
    );
  }

}
