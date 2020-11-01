import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { District } from 'src/app/model/district.model';
import { Province } from 'src/app/model/province.model';
import { AddressService } from 'src/app/service/address.service';

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
  filteredProvinces: Observable<Array<Province>>;
  filteredDistricts: Observable<Array<District>>;
  filteredWards: Observable<string[]>;

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initSalonForm();
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

  getProvinces() {
    return this.addressService.getProvince()
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
    console.log(this.salonForm.value);
  }

}
