import { Client } from './../models/client.model';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ClientService } from '../services/client.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit {
  cartProducts: Product[] = [];
  public clients: Client[] = [];
  public clientShoping: Client;
  selection = "";

  constructor(
    private shoppingCartService: ShoppingCartService,
    private clientService: ClientService,
    private tokenStorageService: TokenStorageService
  ) {
    this.clientShoping = {"idcliente":0, "amaterno":"","apaterno":"", "nombre": "", "rfc": ""};
   }

  ngOnInit(): void {
    this.getClients();
    this.getCartProduct();
  }

  getCartProduct() {
    this.cartProducts = this.shoppingCartService.getLocalCartProducts();
  }

    //Mpetodo que consulta la lista de clientes del market place
    getClients(){
      const token = this.tokenStorageService.getToken();
      this.clientService.getClients(token).subscribe({
        next: result => { this.clients = result },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
    }


    country1Changed(arg:any) {
      console.log("name1Changed " + arg.target.value);
      this.clientShoping = this.clients.find(x => x.idcliente == arg.target.value)!;
      console.log(arg);
     }
}
