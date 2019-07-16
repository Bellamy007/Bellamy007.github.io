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
        // console.log(res);
      }
    );
  }

  getShoppingCartAsArray(): Array<Product> {
    // console.log(this.shoppingCart);
    // console.log('ee', this._shoppingCart.shoppingCart);
     const newShoppingCart = Array.from(this.shoppingCart.values());
    this.totalCost = 0;
    var i = 0;
    while (i < newShoppingCart.length) {
      this.totalCost += newShoppingCart[i].amount * newShoppingCart[i].unitPrice;
      i++;
    }
    return Array.from(this.shoppingCart.values());
  }
  getTotal() {
    const newShoppingCart = Array.from(this.shoppingCart.values());
    console.log(newShoppingCart);
    this.totalCost = 0;
    var i = 0;
    while (i < newShoppingCart.length) {
    this.totalCost += newShoppingCart[i].amount * newShoppingCart[i].unitPrice;
    i++;
    }
    return this.totalCost
  }

  addProd(element: Product): void {
    element.productFinalPrice = element.amount * element.unitPrice; //Esto no sirve
    this._shoppingCart.addProduct(element);
  }

  delProduct(element: Product): void {
    this._shoppingCart.removeProduct(element.productId);
  }

  toggleShoppingCart(): void {
    this.showShoppingCart = !this.showShoppingCart;
  }

}
