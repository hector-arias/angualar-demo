import { Component, OnInit } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { ProductoService } from '../services/producto.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public inventory : Inventory[] =[];
  public sumaVentalesTotales: number;
  public sumaCantidadVedidos: number;
  public sumaStock: number;

  constructor(
    private productService: ProductoService,
    private tokenStorageService: TokenStorageService
  ) {
    this.sumaVentalesTotales = 0;
    this.sumaCantidadVedidos = 0;
    this.sumaStock = 0;
  }

  ngOnInit(): void {
      this.getInventory();

  }

  //Método para consultar el inventario del marketplace con el servicio
  getInventory(){
      const token =  this.tokenStorageService.getToken();
      this.productService.getInventory(token).subscribe(
        result => {
           console.log("result", result);
            this.inventory = result;
            this.calcularTotales();
        },
        error => {
          console.log(<any>error);

        }
      )
  }

  calcularTotales(){
    this.inventory.forEach(element => {
        this.sumaCantidadVedidos += element.cantidadvendidos;
        this.sumaVentalesTotales += element.ventastotales;
        this.sumaStock += element.stock;
        console.log('sumaCantidadVedidos',this.sumaCantidadVedidos);
    });
  }

}
