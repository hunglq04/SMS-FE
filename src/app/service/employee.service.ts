import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Province } from '../model/province.model';
import { District } from '../model/district.model';
import { ManagerInfo } from '../model/manager-info.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getAllManagerInfos() {
    return this.httpClient.get<Array<ManagerInfo>>(`${environment.internalApiUrl}/employee/managers`)
              .toPromise();
  }
}
