import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MainComponent} from './main/main.component';
import {AppRoutingModule} from './app-routing.module';
import {UserComponent} from './user/user.component';
import {UserService} from './user.service';
import {LoggingGuard} from './logging.guard';
import {OrderService} from './order.service';
import {ProductService} from './product.service';
import {OrderComponent} from './order/order.component';
import {ProductComponent} from './product/product.component';
import {DiscountService} from "./discount.service";
import { NavigationComponent } from './navigation/navigation.component';
import { RealizedOrderComponent } from './realized-order/realized-order.component';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MainComponent,
    UserComponent,
    OrderComponent,
    ProductComponent,
    NavigationComponent,
    RealizedOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [LoginService,
              HttpClient,
              UserService,
              LoggingGuard,
              OrderService,
              ProductService,
              DiscountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
