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
    return this.httpClient.post<any>(`${environment.internalApiUrl}/salon`, body)
              .toPromise();
  }
}
