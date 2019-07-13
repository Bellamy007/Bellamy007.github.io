import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartService } from '../services/shopping-cart.service';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ],
  providers: [
    ShoppingCartService
  ]
})
export class ClientModule { }
