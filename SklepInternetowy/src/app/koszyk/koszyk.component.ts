import {Component, OnInit} from '@angular/core';
import {KoszykService} from "../koszyk.service";
import {Produkt} from "../Produkt";

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {
  produkty: Produkt[];
  sumaCenWKoszyku: number;

  constructor(public koszykService: KoszykService) {
    this.sumaCenWKoszyku = 0;
  }

  public getIlosc(id: string) {
    let iloscProduktow;
    this.koszykService.getIlosc(id)
      .subscribe(ilosc => {iloscProduktow = ilosc;});
    return iloscProduktow;
  }

  public getWartosc(cena: number, ilosc: number, promocja: number) {
    return (cena - (cena * promocja / 100)) * ilosc;
  }

  public usunZKoszyka(id: string) {
    this.koszykService.usunZKoszyka(id);
    this.koszykService.getProdukty()
      .subscribe(produkty => this.produkty = produkty);
    this.sumaCenWKoszyku = 0;
  }

  public getSumaCenWKoszyku() {
    return this.koszykService.sumaWartosci;
  }

  ngOnInit() {
    this.koszykService.getProdukty()
      .subscribe(produkty => this.produkty = produkty);
  }

}
