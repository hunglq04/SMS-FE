import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginForm: FormGroup;
  isShowError = false;

  constructor   (
    private loginService: AuthenticationService,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.loginService.authenticate(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .then(res => {
          let role = this.loginService.extractUserRole(res.roles);
          alert(role);
      }).catch(err => {
        if (err.status) {
          this.isShowError = true;
        }
      })
  }

}
