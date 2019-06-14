import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './services/products.service';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'coke';
  products: Observable<Array<any>>;
  counter: number;
  shoppingCart: Product[] = [];
  showShoppingCart = false;
  ngOnInit() {
    this.getProducts();
  }
  constructor(private _productService: ProductsService) {
    this.counter = 0;
  }
  getProducts() {
    this._productService.getProducts().subscribe(
      res => this.products = res.products
    );
  }
  addProd(element: Product) {
    let flag = true;
    for (let i = 0; i < this.shoppingCart.length; i++) {
      if (this.shoppingCart[i].productId === element.productId) {
         flag = false;
         break;
      }
    }
    if (flag) {
      // alert('Producto agregado al carrito');
      this.shoppingCart[this.counter] = element;
      this.counter++;
    } else {
      alert('El producto ya fue agregado anteriormente');
    }
    console.log(this.shoppingCart);
  }

  toggleShoppingCart(): void {
    this.showShoppingCart = !this.showShoppingCart;
  }
}
