import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  categories$;
  @Input('category') category:any;
  @Output () valueResponse: EventEmitter<number> = new EventEmitter();
  public idcategoria: number = 0;

  constructor(	private _productoService: ProductoService,
    private tokenService: TokenStorageService) {
    const token = this.tokenService.getToken();
    this.categories$ = _productoService.getCategorias(token);
  }

  filtrar(idcategoria: number){
    this.idcategoria = idcategoria;
    this.valueResponse.emit(this.idcategoria);
  }


}
