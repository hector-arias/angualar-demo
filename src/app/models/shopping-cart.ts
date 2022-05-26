import { Client } from './client.model';
import { User } from './user';
import { shopping_cart } from './shopping-cart-item';

export interface shopping {
  cliente: Client,
  compraproductos: shopping_cart[],
  fecha: string,
  idcompra: number,
  total: number,
  usuario: User
}
