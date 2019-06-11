import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uriListProd = 'assets/mocks/list-products.json';
  constructor(private _http: HttpClient) { }

  getProducts(): Observable<any> {
    return this._http.get(this.uriListProd);
  }
}
