import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { District } from 'src/app/model/district.model';
import { ManagerInfo } from 'src/app/model/manager-info.model';
import { Province } from 'src/app/model/province.model';
import { NewSalon } from 'src/app/model/new-salon.model';
import { AddressService } from 'src/app/service/address.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { SalonService } from 'src/app/service/salon.service';
import { StorageService } from 'src/app/service/storage.service';

import * as $ from 'jquery';
import 'bootstrap-notify';

@Component({
  selector: 'app-dialog-new-salon',
  templateUrl: './dialog-new-salon.component.html',
  styleUrls: ['./dialog-new-salon.component.css']
})
export class DialogNewSalonComponent implements OnInit {

  salonForm: FormGroup;
  provinces: Array<Province>;
  districts: Array<District>;
  wards: Array<string>;
  managers: Array<ManagerInfo>;
  filteredManagers: Observable<Array<ManagerInfo>>;
  filteredProvinces: Observable<Array<Province>>;
  filteredDistricts: Observable<Array<District>>;
  filteredWards: Observable<string[]>;
  errorMessage = '';
  isSaved = false;

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private employeeService: EmployeeService,
    private salonService: SalonService,
  ) { }

  ngOnInit() {
    this.initSalonForm();
    this.getManagers();
    this.getProvinces();
  }

  initSalonForm() {
    this.salonForm = this.fb.group({
      manager: ['', Validators.required],
      image: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }

  filterManagers(name: string): ManagerInfo[] {
    const filterValue = name.toLowerCase();
    return this.managers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterProvince(name: string): Province[] {
    const filterValue = name.toLowerCase();
    return this.provinces.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterDistricts(name: string): District[] {
    const filterValue = name.toLowerCase();
    return this.districts.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterWard(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.wards.filter(option => option.toLowerCase().includes(filterValue));
  }

  getManagers() {
    this.employeeService.getAllManagerInfos()
      .then(res => {
        this.managers = res;
        this.filteredManagers = this.salonForm.controls['manager'].valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterManagers(name) : this.managers.slice())
        );
    })
  }

  getProvinces() {
    this.addressService.getProvince()
      .then(res => {
        this.provinces = res;
        this.filteredProvinces = this.salonForm.controls['province'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterProvince(name) : this.provinces.slice())
          );
      })
  }

  getDistrictsAndWards(provinceId) {
    this.salonForm.controls['district'].setValue('');
    this.salonForm.controls['ward'].setValue('');
    this.addressService.getDistrictsAndWards(provinceId)
      .then(res => {
        this.districts = res;
        this.filteredDistricts = this.salonForm.controls['district'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterDistricts(name) : this.districts.slice())
          );
      })
  }

  onDistrictChange(districtId) {
    this.salonForm.controls['ward'].setValue('');
    this.wards = this.districts.find(district => district.id == districtId).wards;
    this.filteredWards = this.salonForm.controls['ward'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterWard(value))
    );
  }

  getImageUrl(imageUrl) {
    this.salonForm.get('image').setValue(imageUrl);
  }

  removeImage() {
    if (this.isSaved) return;
    let imageUrl = this.salonForm.get('image').value;
    if (imageUrl) {
      this.storageService.delete(imageUrl);
    }
  }

  saveSalon() {
    if (!this.errorMessage) {
      let salon = new NewSalon(
        this.salonForm.get('manager').value['id'],
        this.salonForm.get('province').value['id'],
        this.salonForm.get('district').value['id'],
        this.salonForm.get('ward').value,
        this.salonForm.get('street').value,
        this.salonForm.get('image').value
      )
      this.salonService.addNewSalon(salon)
      .then(() => {
        this.showNotification("done", "Thêm thành công", "success", "top", "center");
        this.isSaved = true
      })
    }
  }

  showNotification(icon, message, type, from, align){

    $.notify({
        icon: icon,
        message: message
    },{
        type: type,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          `<i class="material-icons" data-notify="icon">${icon}</i> ` +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

}
