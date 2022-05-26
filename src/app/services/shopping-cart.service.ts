import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, take } from 'rxjs';
import { Product } from '../models/product.model';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public products: Product[] = [];

  constructor(private db: AngularFireDatabase,
    private toastrService: ToastrService) { }


   //async getCart(): Promise<Observable<ShoppingCart>> {
   //  let cartId = await this.getOrCreateCartId();
     //return this.db.object('/shopping-carts/' + cartId)
//   //  .map(x => new ShoppingCart(x.items));
   //}

  async addToCart(product: Product) {

    const a: Product[] = JSON.parse(localStorage.getItem("avct_item")!) || [];
    a.push(product);
    console.log('product',a)
    localStorage.setItem("avct_item", JSON.stringify(a));

  }

  //Sirve
    // Fetching Locat CartsProducts
  getLocalCartProducts(): Product[] {
      const products: Product[] = JSON.parse(localStorage.getItem("avct_item")!) || [];
      return products;
  }

  deleteProductCart(product: Product){
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item")!) || [];
    let indexItem = this.products.indexOf(product);

    products.splice(indexItem, 1)
    localStorage.setItem("avct_item", JSON.stringify(products));
    console.log(products)
  }

  private async updateItem(product: Product, change: number) {
  	let cartId = await this.getOrCreateCartId();
  	let item$ = this.getItem(cartId, product.idproducto);
  	item$.valueChanges().subscribe(item => {
  		let quantity =  change;
  		if (quantity === 0) item$.remove();
  		else item$.update({
  			title: product.nombre,
  			imageUrl: product.imageUrl,
  			price: product.precio,
  			quantity: quantity
  		});
  	})
  }

  private async getOrCreateCartId(): Promise<string> {
  	let cartId = localStorage.getItem('cartId')
  	if (cartId) return cartId;

  	let result = await this.create();
  	localStorage.setItem('cartId', result.key!);
  	return result.key!;
  }

  private getItem(cartId: string, productId: number) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    //return {nombre: 'ere'};
  }

  private create() {
  	return this.db.list('/shopping-carts').push({dateCreated: new Date().getTime()})
    // return {key  : '1'};
  }

  async removeFromCart(product: Product) {
    this.updateItem(product,-1);
   }
}
