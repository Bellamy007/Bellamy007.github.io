import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';

const httpHeaders = new HttpHeaders ({
  'Content-Type': 'application/json',
  'client_id': 'e14255320b394a198491c0f4a9db0295',
  'client_secret': '267b319ad5594887851011f9A0158D0b'
});
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // uriListProd = 'assets/mocks/list-products.json';
  uriListProd = 'https://kof-demo-oracle-db-sapi.us-e2.cloudhub.io/api/products';
  constructor(private _http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this._http.get<{products: Array<Product>}>(this.uriListProd, { headers: httpHeaders } ).pipe(
      map((products) => {
        for (const product of products.products) {
          product.amount = 0;
        }
        return products.products;
      })
    );
  }
}
