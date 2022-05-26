import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product!: Product ;
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
