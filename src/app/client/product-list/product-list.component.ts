import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  title = 'coke';
  products: Array<Product>;
  counter: number;
  shoppingCart: Map<number, Product>;
  showShoppingCart = false;
  totalCost;

  ngOnInit() {
    this.getProducts();
    this.shoppingCart = new Map<number, Product>();
    this._shoppingCart.shoppingCart$.subscribe(((sc) => {
      // console.log(sc);
      this.shoppingCart = sc;
    }));
  }
  constructor(private _productService: ProductsService, private _shoppingCart: ShoppingCartService) {
    this.counter = 0;
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      (res) => {
        this.products = res;
      }
    );
  }

  getShoppingCartAsArray(): Array<Product> {
    // console.log(this.shoppingCart);
    // console.log('ee', this._shoppingCart.shoppingCart);
    return Array.from(this.shoppingCart.values());
    console.log(Array.from(this.shoppingCart.values()));
    this.totalCost = 0;
  }

  addProd(element: Product): void {
    this._shoppingCart.addProduct(element);
  }

  delProduct(element: Product): void {
    this._shoppingCart.removeProduct(element.productId);
  }

  toggleShoppingCart(): void {
    this.showShoppingCart = !this.showShoppingCart;
  }



}
