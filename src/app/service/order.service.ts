import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getOrder(pageOffset, pageSize, fromDate) {
    return this.httpClient.get<any>(`${environment.internalApiUrl}/order?pageOffset=${pageOffset}&pageSize=${pageSize}&fromDate=${fromDate}`)
        .toPromise();
  }

  getOrderDetail(orderId) {
    return this.httpClient.get<any>(`${environment.internalApiUrl}/order/{orderId}?orderId=${orderId}`)
        .toPromise();
  }

  confirmOrder(orderId :number){
    return this.httpClient.post<number>(`${environment.internalApiUrl}/order/${orderId}/confirm?orderId=${orderId}`, null)
    .toPromise();
  }

  confirmCompledtedOrder(orderId :number){
    return this.httpClient.post<number>(`${environment.internalApiUrl}/order/${orderId}/confirmcompleted?orderId=${orderId}`, null)
    .toPromise();
  }

  sendMail(body){
    return this.httpClient.post<any>(`${environment.baseUrl}/api/send-mail`, body)
    .toPromise();
  }
}
