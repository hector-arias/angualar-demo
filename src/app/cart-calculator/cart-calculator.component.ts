import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-cart-calculator',
  templateUrl: './cart-calculator.component.html',
  styleUrls: ['./cart-calculator.component.css']
})
export class CartCalculatorComponent implements OnInit {
  @Input() products: Product[] = [];

  totalValue = 0;
  constructor(private shoppingCartService : ShoppingCartService) {}

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes['products'];

    const products: Product[] = dataChanges.currentValue;
    this.totalValue = 0;
    products.forEach((product) => {
      this.totalValue += product.precio;
    });
  }

  ngOnInit(): void {
  }

  deleteProductCart(product: Product){
    this.shoppingCartService.deleteProductCart(product);
    this.products = this.shoppingCartService.getLocalCartProducts();
    this.totalValue = 0;
    this.products.forEach((product) => {
      this.totalValue += product.precio;
    });
  }

  checkout(){
      
  }


}
