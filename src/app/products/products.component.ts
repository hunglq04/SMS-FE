import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewProductComponent } from '../dialogs/dialog-new-product/dialog-new-product.component';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { Page } from '../model/page.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;
  page: Page;
  pageOffset = 0;
  addProductId = -1;
  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();

  }

  openDialog(id) {
    const dialogRef = this.dialog.open(DialogNewProductComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editProduct(id) {
  }
  getProduct() {
    return this.productService.getProduct()
      .then(res => {
        this.products = res;
      })
  }
  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .then(res => console.log(res))
    window.location.reload();
  }
}
