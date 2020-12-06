import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../model/product.model'
import { ProductType } from '../model/product-type.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getProduct() {
    return this.httpClient.get<Array<Product>>(`${environment.baseUrl}/client/product`)
      .toPromise();
  }
  getProductId(id) {
    return this.httpClient.get<any>(`${environment.baseUrl}/client/productdetail?id=${id}`)
      .toPromise();
  }
  addNewProduct(body) {
    return this.httpClient.post<any>(`${environment.internalApiUrl}/product`, body).toPromise();
  }
  updateProduct(body, id){
    return this.httpClient.put<any>(`${environment.internalApiUrl}/product/${id}`, body).toPromise();
  }
  deleteProduct(id) {
    return this.httpClient.delete<any>(`${environment.baseUrl}/internal/product/${id}`)
      .toPromise();
  }
  getProductType() {
    return this.httpClient.get<Array<ProductType>>(`${environment.baseUrl}/internal/producttype`)
      .toPromise();
  }
}
