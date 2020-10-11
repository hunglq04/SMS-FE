import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../model/account.model';

const baseUrl = 'https://sms-be.herokuapp.com/';
// const baseUrl = 'http://localhost:5000/';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient
    ) {}

    authenticate() {
        return this.httpClient.get<Account>(`${baseUrl}/account/admin`)
            .toPromise()
            .then( res => res)
            .catch(err => {
                console.error(err)
            })
      }
  

    isUserLoggedIn() {
        return sessionStorage.getItem('idCard') != null;
    }

    logOut() {
        sessionStorage.removeItem('idCard');
    }

}