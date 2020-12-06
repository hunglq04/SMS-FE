import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getBooking(pageOffset, pageSize, fromDate, salonId) {
    return this.httpClient.get<any>(`${environment.internalApiUrl}/booking?pageOffset=${pageOffset}&pageSize=${pageSize}&fromDate=${fromDate}&salonId=${salonId}`)
        .toPromise();
  }

  postBooKing(bookingInfo: any) {
    return this.httpClient.post<void>(`${environment.internalApiUrl}/booking`, bookingInfo).toPromise();
  }

  postInvoice(bookingId: number) {
    return this.httpClient.post<number>(`${environment.internalApiUrl}/booking/${bookingId}/invoice`, null).toPromise();
  }
}
