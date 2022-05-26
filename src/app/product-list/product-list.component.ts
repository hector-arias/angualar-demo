import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, provideRoutes, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductoService } from '../services/producto.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Categoria } from '../models/categoria.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductoService]
})
export class ProductListComponent implements OnInit {
	public products: Product[];
  public categories: Categoria[];
  public filteredProducts: Product[] = [];
  public confirmado : any;
  public token: string | undefined;
  category!: string;


  public wordFilter: string = "";


  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService,
    private tokenService: TokenStorageService
  ) {
    this.products = [];
    this.confirmado = null;
    this.categories = [];
   }

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
  }

   getProductos(){
    const token = this.tokenService.getToken();
		this._productoService.getProductos(token).subscribe(
			result => {
        console.log('result.code',result)
					this.products = result;
          this.category = this._route.snapshot.queryParamMap.get('category')!;
          //params.get('category');
          this.applyFilter();
			},
			error => {
				console.log(<any>error);
			}
		);
	}


  getCategorias(){
    const token = this.tokenService.getToken();
		this._productoService.getCategorias(token).subscribe({
      next: result => this.categories = result,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
	}

  private applyFilter() {
    console.log('this.products',this.products);
    console.log('this.category',this.category);

    this.filteredProducts = (this.category) ?
    this.products.filter(p=> p.categoria.nombre === this.category) :
    this.products;
    console.log('orfr', this.products);
  }

  recibiRespuesta(respuesta:any) {
    this.filteredProducts = this.products.filter(p=> p.categoria.idcategoria === respuesta);
  }

  getProductsFilter(){
    const token = this.tokenService.getToken();
		this._productoService.getProductsFilter(token, this.wordFilter).subscribe({
      next: result => { console.log('rererer', result), this.products = result; this.applyFilter() },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

}
