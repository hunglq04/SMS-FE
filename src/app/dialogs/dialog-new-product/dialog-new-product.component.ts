import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service'
import { ProductType } from 'src/app/model/product-type.model'
import { NewProduct } from 'src/app/model/new-product.model';

import * as $ from 'jquery';
import 'bootstrap-notify';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-dialog-new-product',
  templateUrl: './dialog-new-product.component.html',
  styleUrls: ['./dialog-new-product.component.css']
})
export class DialogNewProductComponent implements OnInit {
  productForm: FormGroup;
  productTypes: Array<ProductType>;
  filteredProductType: Observable<Array<ProductType>>;
  product: any;
  errorMessage = '';
  dialogTitle = '';
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      productType: ['', Validators.required],
    });
    this.getProductType();
    console.log(this.productTypes);
    if (this.data.id == -1) {
      this.dialogTitle = 'Thêm sản phẩm';
    }
    else {
      this.dialogTitle = 'Cập nhật sản phẩm';
      this.getProductById();
    }
  }
  getProductById() {
    this.productService.getProductId(this.data.id)
      .then(res => {
        this.product = res;
        this.productForm.controls['name'].setValue(this.product.name);
        this.productForm.controls['price'].setValue(this.product.price);
        this.productForm.controls['imageUrl'].setValue(this.product.image);
        this.productForm.controls['description'].setValue(this.product.description);
        this.productForm.controls['productType'].setValue(this.product.productType);
      })
  }
  getProductType() {
    this.productService.getProductType()
      .then(res => {
        this.productTypes = res;
        this.filteredProductType = this.productForm.controls['productType'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterProductType(name) : this.productTypes.slice())
          );
      })
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }

  filterProductType(name: string): ProductType[] {
    const filterValue = name.toLowerCase();
    return this.productTypes.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getImageUrl(imageUrl) {
    this.productForm.get('imageUrl').setValue(imageUrl);
  }
  saveProduct() {
    if (this.data.id == -1) {
      if (!this.errorMessage) {
        let product = new NewProduct(
          this.productForm.get('productType').value['id'],
          this.productForm.get('name').value,
          this.productForm.get('price').value,
          this.productForm.get('imageUrl').value,
          this.productForm.get('description').value
        )
        this.productService.addNewProduct(product)
          .then(() => {
            this.showNotification("done", "Thêm thành công", "success", "top", "center");
          })
        // window.location.reload();
      }
    } else {
      if (!this.errorMessage) {
        let product = new NewProduct(
          this.productForm.get('productType').value['id'],
          this.productForm.get('name').value,
          this.productForm.get('price').value,
          this.productForm.get('imageUrl').value,
          this.productForm.get('description').value
        )
        this.productService.updateProduct(product, this.data.id)
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
