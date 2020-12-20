import { Component, Inject, OnInit } from '@angular/core';
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
  serviceForm: FormGroup;
  service: any;
  serviceTypes: any;
  filteredServiceType: Observable<any>;
  errorMessage = '';
  dialogTitle = '';
  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      bookingImage: ['', Validators.required],
      bookingRecommendImage: ['', Validators.required],
      description: ['', Validators.required],
      descriptionImage: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      serviceType: ['', Validators.required],
      duration: ['', Validators.required],

    });
    this.getServiceType();
    if (this.data == '-1') {
      this.dialogTitle = 'Thêm dịch vụ';
    }
    else {
      this.dialogTitle = 'Cập nhật dịch vụ';
      this.getServicetById();
    }
  }
  getServicetById() {
    this.serviceService.getServiceById(this.data.id)
      .then(res => {
        this.service = res
        this.serviceForm.controls['name'].setValue(this.service.name);
        // this.serviceForm.controls['bookingImage'].setValue(this.service.bookingImage);
        // this.serviceForm.controls['bookingRecomemendImage'].setValue(this.service.bookingRecommendImage);
        this.serviceForm.controls['description'].setValue(this.service.description);
        // this.serviceForm.controls['descriptionImage'].setValue(this.service.descriptionImage);
        this.serviceForm.controls['price'].setValue(this.service.price);
        this.serviceForm.controls['duration'].setValue(this.service.duration);
        this.serviceForm.controls['image'].setValue(this.service.image);
        this.serviceForm.controls['serviceType'].setValue(this.service.serviceType);
      })
  }
  getServiceType() {
    this.serviceService.getServiceType()
      .then(res => {
        this.serviceTypes = res;
        this.filteredServiceType = this.serviceForm.controls['serviceType'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterServiceType(name) : this.serviceTypes.slice())
          );
      })
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }

  filterServiceType(name: string): ServiceType[] {
    const filterValue = name.toLowerCase();
    return this.serviceTypes.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getImageUrl(imageUrl) {
    this.serviceForm.get('image').setValue(imageUrl);
  }
  getbookingImage(imageUrl) {
    this.serviceForm.get('bookingImage').setValue(imageUrl);
  }
  getdescriptionImage(imageUrl) {
    this.serviceForm.get('descriptionImage').setValue(imageUrl);
  }

  saveService() {
    if (this.data == -1) {
      if (!this.errorMessage) {
        let service = new NewService(
          this.serviceForm.get('serviceType').value['id'],
          this.serviceForm.get('name').value,
          this.serviceForm.get('bookingImage').value,
          this.serviceForm.get('description').value,
          this.serviceForm.get('descriptionImage').value,
          this.serviceForm.get('bookingRecommendImage').value,
          this.serviceForm.get('price').value,
          this.serviceForm.get('duration').value,
        )
        this.serviceService.addNewService(service)
          .then(() => {
            this.showNotification("done", "Thêm thành công", "success", "top", "center");
          })
      }
    } else {
      if (!this.errorMessage) {
        let service = new NewService(
          this.serviceForm.get('serviceType').value['id'],
          this.serviceForm.get('name').value,
          this.serviceForm.get('bookingImage').value,
          this.serviceForm.get('description').value,
          this.serviceForm.get('descriptionImage').value,
          this.serviceForm.get('bookingRecommendImage').value,
          this.serviceForm.get('price').value,
          this.serviceForm.get('duration').value,
        )
        this.serviceService.updateService(service, this.data.id)
          .then(() => {
            this.showNotification("done", "Cập nhật thành công", "success", "top", "center");
          })
      }
    }
  }
  showNotification(icon, message, type, from, align) {

    $.notify({
      icon: icon,
      message: message
    }, {
      type: type,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        `<i class="material-icons" data-notify="icon">${icon}</i> ` +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
