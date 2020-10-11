import { Component, OnInit } from '@angular/core';
import { Account } from '../model/account.model';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  account: Account;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.authenticate()
      .then(res => console.log(res))
  }

}
