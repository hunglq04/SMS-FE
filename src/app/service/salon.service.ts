import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  constructor(
    private httpClient: HttpClient
  ) {}

  addNewSalon(body) {
    return this.httpClient.post<any>(`${environment.internalApiUrl}/salon`, body).toPromise();
  }

  getSalon(pageOffset, pageSize) {
    return this.httpClient.get<any>(`${environment.internalApiUrl}/salon?pageOffset=${pageOffset}&pageSize=${pageSize}`).toPromise();
  }

  getSalonByManager() {
    return this.httpClient.get<any>(`${environment.internalApiUrl}/salon/manager`).toPromise();
  }

  getAllService() {
    return this.httpClient.get<any>(`${environment.baseUrl}/client/service/booking`).toPromise();
  }

  getSalonStatistic(salonId, date, monthYear, year) {
    return this.httpClient.get<any>(`${environment.internalApiUrl}/salon/statistic?salonId=${salonId}&date=${date}&monthYear=${monthYear}&year=${year}`).toPromise();
  }
}
