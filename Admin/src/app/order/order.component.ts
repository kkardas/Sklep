import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../Order';
import {ProductInDetails} from "../ProductInDetails";
import {ProductService} from "../product.service";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: Order;
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
    this.orderService.getNotRealizedOrders()
      .subscribe(orders => this.orders = orders);
  }

  public changeStatus(order: Order) {
    this.selectedId = '';
    this.orderService.changeStatus(order)
      .subscribe(orderr => this.orders.splice(this.orders.indexOf(orderr), 1));
  }
}
