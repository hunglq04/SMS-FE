import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewProductComponent } from '../dialogs/dialog-new-product/dialog-new-product.component';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { Page } from '../model/page.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  page: Page;
  addProductId = -1;
  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct(0);
  }

  openDialog(id, imageUrl) {
    const dialogRef = this.dialog.open(DialogNewProductComponent, {
      data: {
        id: id,
        imageUrl: imageUrl
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getProduct(pageOffset) {
    return this.productService.getProduct(pageOffset, 10)
      .then(res => {
        this.products = res["content"];
        this.page = new Page(res);
      })
  }

  pageChange(page) {
    this.getProduct(page);
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .then(res => console.log(res))
    window.location.reload();
  }
}
