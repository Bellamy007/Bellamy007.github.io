import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uriListProd = 'assets/mocks/list-products.json';
  constructor(private _http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this._http.get<{products: Array<Product>}>(this.uriListProd).pipe(
      map((products) => {
        for (const product of products.products) {
          product.amount = 0;
        }
        return products.products;
      })
    );
  }
}
