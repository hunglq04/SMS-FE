import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account } from '../model/account.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient
    ) {}

    authenticate(username, password) {
        return this.httpClient.post<Account>(`${environment.baseUrl}/login`,{username,password})
            .toPromise()
            .then( res => {
                 sessionStorage.setItem('username',username);
                 sessionStorage.setItem('token', 'Bearer ' + res.token);
                 sessionStorage.setItem('roles', JSON.stringify(res.roles));
                 return res;
            })
      }
  

    isUserLoggedIn() {
        return sessionStorage.getItem('username') != null;
    }

    logOut() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('roles');
        window.location.href = '/login';
    }

    extractUserRole() {
        let roles = JSON.parse(sessionStorage.getItem('roles')) || '';
        if (roles.includes(environment.ROLE_ADMIN)) {
            return environment.ROLE_ADMIN;
        } else if (roles.includes(environment.ROLE_MANAGER)) {
            return environment.ROLE_MANAGER
        } else if (roles.includes(environment.ROLE_CASHIER)) {
            return environment.ROLE_CASHIER
        } else if (roles.includes(environment.ROLE_STYLIST)) {
            return environment.ROLE_STYLIST
        } else {
            return "";
        }
    }

}
