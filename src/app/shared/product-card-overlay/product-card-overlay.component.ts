import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-card-overlay',
  templateUrl: './product-card-overlay.component.html',
  styleUrls: ['./product-card-overlay.component.scss']
})
export class ProductCardOverlayComponent implements OnInit {

  @Input() maxAmount = 100;
  @Input() prod: Product;
  @Input() showDelete = false;
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() add: EventEmitter<Product> = new EventEmitter<Product>();

  constructor( private _shoppinCart: ShoppingCartService) { }

  ngOnInit() {
  }

  addAmount() {
    (this.prod.amount + 1 <= this.maxAmount) ? this.prod.amount++ : this.prod.amount = this.maxAmount;
  }

  reduceAmount() {
    if(this.showDelete) {
      (this.prod.amount > 1) ? this.prod.amount-- : this.prod.amount = 1;
    } else {
      (this.prod.amount > 0) ? this.prod.amount-- : this.prod.amount = 0;
    }
  }

  onInputChange($event: any): void {
    const defMin = (this.showDelete) ? 1 : 0;
    const amVal = $event.srcElement.valueAsNumber;
    if (isNaN(amVal) || amVal < defMin) {
      this.prod.amount = defMin;
      return;
    }
    if (amVal > this.maxAmount) {
      this.prod.amount = this.maxAmount;
    } else {
      this.prod.amount = amVal;
    }
  }

  deleteProduct(): void {
    this.delete.emit(this.prod);
  }

  addProduct(): void {
    const newProd = JSON.parse(JSON.stringify(this.prod));
    if (newProd.amount < 1) {
      newProd.amount = 1;
    }
    console.log(newProd);
    this.add.emit(newProd);
    this.prod.amount = 0;
  }
}
