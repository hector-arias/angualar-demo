import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Params } from '@angular/router';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { TokenStorageService } from './token-storage.service';
import { catchError, throwError, Observable } from 'rxjs';
const TOKEN_KEY = 'auth-token';

@Injectable()
export class ProductoService{
	public url: string;
  public pp: string | null;
  public products: Product[] = [];

	constructor(
		public _http: HttpClient,
    private tokenStorage: TokenStorageService,
	){
		this.url = GLOBAL.url;
    this.pp = '';
	}

	getProductos(token: any):Observable<any>{
    let headers = {'Authorization':  'Bearer ' + token.toString()};
    console.log('token.toString()',token.toString());
		return this._http.get(this.url+'producto', {headers}).pipe(
      catchError(err => {
         console.log(`En el servicio: ${err.error}`);
         return throwError(err);
      }));
	}

  getCategorias(token: any):Observable<any>{
    let headers = {'Authorization':  'Bearer ' + token.toString()};
    console.log('token.toString()',token.toString());
		return this._http.get(this.url+'categoria', {headers});
	}

  getInventory(token:any):Observable<any>{
    let headers = {'Authorization': 'Bearer ' + token.toString()};
     return this._http.get(this.url + 'compra/inventario', {headers})
   }

  getProductsFilter(token:any, filter: string):Observable<any>{
    let headers = {'Authorization':  'Bearer ' + token.toString()};
		return this._http.get(this.url+'producto/busqueda/'+ filter, {headers}).pipe(
      catchError(err => {
         console.log(`En el servicio: ${err.error}`);
         return throwError(err);
      }));
	}


}
