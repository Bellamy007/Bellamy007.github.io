import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCardOverlayComponent } from './product-card-overlay/product-card-overlay.component';
import {MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule} from '@angular/material';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductCardComponent, ProductCardOverlayComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatBadgeModule,
    FormsModule
  ],
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatBadgeModule,
    FormsModule,
    ProductCardComponent,
    ProductCardOverlayComponent
  ]
})
export class SharedModule { }
