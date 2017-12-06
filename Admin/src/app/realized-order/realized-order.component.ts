import { Component, OnInit } from '@angular/core';
import {Order} from "../Order";
import {ProductInDetails} from "../ProductInDetails";
import {ProductService} from "../product.service";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-realized-order',
  templateUrl: './realized-order.component.html',
  styleUrls: ['./realized-order.component.css']
})
export class RealizedOrderComponent implements OnInit {
  orders: Array<Order>;
  productsInDetails: Array<ProductInDetails>;
  selectedId: string;

  constructor(private productService: ProductService,
              private orderService: OrderService) {
    this.orders = new Array<Order>();
    this.productsInDetails = new Array<ProductInDetails>();
    this.selectedId = '';
  }

  ngOnInit() {
    this.getOrders();
  }

  public getDetailsOrder(order: Order) {
    this.productsInDetails = new Array<ProductInDetails>();
    this.selectedId = order._id;
    order.produkty
      .map(product => this.productService.getProductById(product.produktId)
        .subscribe(prod => this.productsInDetails.push(new ProductInDetails(prod.nazwa, prod.cena, product.ilosc))));
  }

  public getOrders() {
    this.orderService.getRealizedOrders()
      .subscribe(orders => this.orders = orders);
  }

  public changeStatus(order: Order) {
    this.orderService.changeStatus(order)
      .subscribe();
  }
}
