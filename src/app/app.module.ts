import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductoService } from './services/producto.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    HomeComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ProductQuantityComponent,
    CartCalculatorComponent,
    CartProductsComponent,
    InventoryComponent
  ],
  imports: [

    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireDatabaseModule,
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
