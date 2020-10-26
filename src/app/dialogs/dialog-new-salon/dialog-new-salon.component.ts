import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Province } from 'src/app/model/province.model';
import { AddressService } from 'src/app/service/address.service';

@Component({
  selector: 'app-dialog-new-salon',
  templateUrl: './dialog-new-salon.component.html',
  styleUrls: ['./dialog-new-salon.component.css']
})
export class DialogNewSalonComponent implements OnInit {

  myControl = new FormControl();
  provinces: Array<Province>;
  filteredProvinces: Observable<Array<Province>>;

  constructor(
    private addressService: AddressService
  ) { }

  async ngOnInit() {
    await this.getProvinces();
    this.filteredProvinces = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.provinces.slice())
      );
  }

  displayFn(province: Province): string {
    return province && province.name ? province.name : '';
  }

  private _filter(name: string): Province[] {
    const filterValue = name.toLowerCase();

    return this.provinces.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getProvinces() {
    return this.addressService.getProvince()
      .then(res => {
        this.provinces = res;
      })
  }

  getDistrictsAndWards(provinceId) {
    this.addressService.getDistrictsAndWards(provinceId)
      .then(res => {
        alert(JSON.stringify(res))
      })
  }

}
