import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../services/global';
import { TokenStorageService } from '../services/token-storage.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public title: string;
  public header_color: string;
  public Administrador: string;
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService,
              public shoppingCartService: ShoppingCartService){
    this.title = 'Proyecto_Final';
    this.header_color = GLOBAL.header_color;
    this.Administrador = 'Administrador'
	}

	ngOnInit(){
		console.log('Se ha cargado el componente home.component.ts');
	}

  logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.Administrador = "";
  }

}
