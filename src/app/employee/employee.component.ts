import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';
import { SalonService } from 'src/app/service/salon.service';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page.model';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employes: any;
  page: Page;
  pageOffset = 0;
  salonId = '1';
  salons: any;
  salonCtrl = new FormControl();
  filteredSalons: Observable<any[]>;
  constructor(
    private employeeService: EmployeeService,
    private salonService: SalonService,
  ) { }

  ngOnInit() {
    this.getSalonByManager();
    this.getEmployeePage();
  }

  getEmployeePage() {
    this.employeeService.getAllEmployyBySalon(this.pageOffset, environment.pageSize, this.salonId)
      .then(res => {
        this.employes = res["content"]
        this.page = new Page(res)
        // alert(JSON.stringify(this.employes[0].account.roles[0].id));
      })
      .catch(err => console.log(err));
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

  displayFn(option: any): string {
    return option ? `${option.street}, ${option.district}, ${option.province}` : '';
  }

  onSalonChange(salonId) {
    this.salonId = salonId;
    this.getEmployeePage();
  }

  pageChange(page) {
    this.pageOffset = page;
      this.getEmployeePage();
  }
}
