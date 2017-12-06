import {Component, OnInit} from '@angular/core';
import {KoszykService} from "../koszyk.service";

@Component({
  selector: 'app-pasek-gorny',
  templateUrl: './pasek-gorny.component.html',
  styleUrls: ['./pasek-gorny.component.css']
})
export class PasekGornyComponent implements OnInit {
  iloscWKoszyku: number;
  sumaWartosciWKoszyku: number;
  username: string;

  constructor(private koszykService: KoszykService) {
    this.iloscWKoszyku = 0;
    this.sumaWartosciWKoszyku = 0;
    this.username = '';
  }

  public getSumaWartosciWKoszyku() {
    this.koszykService.getSumaWartosciWKoszyku()
      .subscribe(suma => this.sumaWartosciWKoszyku = suma);
    return this.sumaWartosciWKoszyku;
  }

  public getIloscPrzedmiotowWKoszyku() {
    this.koszykService.getIloscPrzedmiotowWKoszyku()
      .subscribe(ilosc => this.iloscWKoszyku = ilosc);
    return this.iloscWKoszyku;
  }

  ngOnInit() {
    this.getIloscPrzedmiotowWKoszyku();
    this.getSumaWartosciWKoszyku();
  }

  public zalogowany() {
    this.username = localStorage.getItem('username');
    return this.username !== '' && localStorage.getItem('token');
  }

  public wyloguj() {
    this.username = '';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.koszykService.wyloguj();
  }

}
