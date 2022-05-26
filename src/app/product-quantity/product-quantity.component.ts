import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product!: Product;


  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
  	this.cartService.addToCart(this.product);
  }

  removeFromCart() {
  	this.cartService.removeFromCart(this.product)
  }
}
