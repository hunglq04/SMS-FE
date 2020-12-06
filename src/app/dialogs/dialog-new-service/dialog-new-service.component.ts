import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ServiceService } from 'src/app/service/service.service'
import { ServiceType } from 'src/app/model/service-type.model'
import { NewService } from 'src/app/model/new-service.model';
import * as $ from 'jquery';
import 'bootstrap-notify';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-new-service',
  templateUrl: './dialog-new-service.component.html',
  styleUrls: ['./dialog-new-service.component.css']
})
export class DialogNewServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
