import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Province } from '../model/province.model';
import { District } from '../model/district.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getProvince() {
    return this.httpClient.get<Array<Province>>(`${environment.baseUrl}/provinces`)
              .toPromise();
  }

  getDistrictsAndWards(provinceId) {
    return this.httpClient.get<Array<District>>(`${environment.baseUrl}/provinces/${provinceId}/districts`)
              .toPromise();
  }
}
