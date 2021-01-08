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

  postInvoice(bookingId: number, withZP: boolean) {
    return this.httpClient.post<any>(`${environment.internalApiUrl}/booking/${bookingId}/invoice?withZP=${withZP}`, null).toPromise();
  }

  startProgress(bookingId) {
    return this.httpClient.post<any>(`${environment.internalApiUrl}/booking/${bookingId}/start`, null).toPromise();
  }

  finishProgress(bookingId, image1, image2, image3, image4) {
    let images = {
      image1: image1,
      image2: image2,
      image3: image3,
      image4: image4,
    }
    return this.httpClient.post<any>(`${environment.internalApiUrl}/booking/${bookingId}/finish`, images).toPromise();
  }
}
