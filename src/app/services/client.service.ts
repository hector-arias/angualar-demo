import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public url: string;
  public clients: Client[] = [];


  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
    // this.clients = [{
    //   idcliente: 1,
    //   nombre: "Héctor",
    //   apaterno: "Arias"
    // }]
  }

  //Método que va retornar la lista de clientes del marketplace
  getClients(token:any):Observable<any>{
    let headers = {'Authorization':  'Bearer ' + token.toString()};
		return this._http.get(this.url+'cliente', {headers}).pipe(
      catchError(err => {
         console.log(`En el servicio: ${err.error}`);
         return throwError(err);
      }));
  }
}
