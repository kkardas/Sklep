import { Component, OnInit } from '@angular/core';
import {Zamowienie} from "../Zamowienie";
import {ProduktService} from "../produkt.service";
import {ProductInDetails} from "../ProductInDetails";
import {ZamowienieService} from "../zamowienie.service";

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {
  zamowienia: Array<Zamowienie>;
  productsInDetails: Array<ProductInDetails>;
  selectedId: string;

  constructor(private productService: ProduktService,
              private orderService: ZamowienieService) {
    this.zamowienia = new Array<Zamowienie>();
    this.productsInDetails = new Array<ProductInDetails>();
    this.selectedId = '';
  }

  public getDetailsOrder(order: Zamowienie) {
    this.productsInDetails = new Array<ProductInDetails>();
    this.selectedId = order._id;
    order.produkty
      .map(product => this.productService.getProductById(product.produktId)
        .subscribe(prod => this.productsInDetails.push(new ProductInDetails(prod.nazwa, prod.cena, product.ilosc))));
  }

  public getZamowienia() {
    this.orderService.getZamowienia(localStorage.getItem('username'))
      .subscribe(orders => this.zamowienia = orders);
  }

  ngOnInit() {
    this.getZamowienia();
  }

}
