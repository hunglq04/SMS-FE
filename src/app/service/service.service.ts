import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Service } from '../model/service.model'
import { ServiceType } from '../model/service-type.model';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getService() {
    return this.httpClient.get<Array<Service>>(`${environment.baseUrl}/client/service/booking`)
      .toPromise();
  }
  getServiceId(id) {
    return this.httpClient.get<Array<Service>>(`${environment.baseUrl}/client/service/booking/id?id=${id}`)
      .toPromise();
  }
  addNewService(body) {
    return this.httpClient.post<any>(`${environment.internalApiUrl}/service`, body).toPromise();
  }

  deleteService(id) {
    return this.httpClient.delete<any>(`${environment.baseUrl}/internal/service/${id}`)
      .toPromise();
  }
  getServiceType() {
    return this.httpClient.get<Array<ServiceType>>(`${environment.baseUrl}/internal/servicetype`)
      .toPromise();
  }
}
