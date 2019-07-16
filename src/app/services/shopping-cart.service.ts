import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public static SHOPPING_CART_KEY = 'coke_shopping_cart';

  private shoppingCart: Map<number, Product>;
  private shoppingCartSubject: BehaviorSubject<Map<number, Product>>;

  private _maxAmount = 100;

  constructor() {
    this.shoppingCart = new Map<number, Product>();
    this.getStoredShoppingCart();
    this.shoppingCartSubject = new BehaviorSubject(this.shoppingCart);
  }

  private getStoredShoppingCart(): void {
    const localSC = localStorage.getItem(ShoppingCartService.SHOPPING_CART_KEY);
    if (localSC !== null) {
      this.shoppingCart = new Map<number, Product>();
      const cartToLoad = JSON.parse(localSC);
      for (let i = 0; i < cartToLoad.keys.length; i++) {
        this.shoppingCart.set(cartToLoad.keys[i], cartToLoad.values[i]);
      }
    }
  }

  public addProduct(product: Product): void {
    if (this.shoppingCart.has(product.productId)) {
      const foundProduct = this.shoppingCart.get(product.productId);
      foundProduct.amount = Math.min(foundProduct.amount + product.amount, this._maxAmount);
    } else {
      this.shoppingCart.set(product.productId, product);
    }
    // this.shoppingCartSubject.next(this.shoppingCart);
    this.storeShoppingCart();
  }

  public storeShoppingCart(): void {
    const cartToStore = {
      keys: new Array<number>(),
      values: new Array<Product>()
    }
    cartToStore.keys = Array.from(this.shoppingCart.keys());
    cartToStore.values = Array.from(this.shoppingCart.values());
    localStorage.setItem(ShoppingCartService.SHOPPING_CART_KEY, JSON.stringify(cartToStore));
  }

  public deleteShoppingCart(): void {
    this.shoppingCart = new Map<number, Product>();
    this.shoppingCartSubject.next(this.shoppingCart);
    localStorage.removeItem(ShoppingCartService.SHOPPING_CART_KEY);
  }

  public removeProduct(productId: number): boolean {
    const result = this.shoppingCart.delete(productId);
    this.storeShoppingCart();
    // this.shoppingCartSubject.next(this.shoppingCart);
    return result;
  }

  public set maxAmount(max: number) {
    if (max > 0) {
      this._maxAmount = Math.ceil(max);
    } else {
    console.warn('Max amount cannot be a negative number');
    }
  }

  public get maxAmount(): number {
    return this._maxAmount;
  }

  public get shoppingCart$(): Observable<Map<number, Product>> {
    return this.shoppingCartSubject.asObservable();
  }
}
