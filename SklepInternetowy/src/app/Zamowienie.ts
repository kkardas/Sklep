import {ProduktWZamowieniu} from './ProduktWZamowieniu';

export class Zamowienie {
  _id: string;
  login: string;
  imie: string;
  nazwisko: string;
  adres: string;
  wartosc: number;
  zrealizowane: boolean;
  produkty: Array<ProduktWZamowieniu>;

  constructor(p_imie: string,
              p_nazwisko: string,
              p_adres: string,
              p_wartosc: number,
              p_produkty: Array<ProduktWZamowieniu>) {
    this.imie = p_imie;
    this.nazwisko = p_nazwisko;
    this.adres = p_adres;
    this.wartosc = p_wartosc;
    this.zrealizowane = false;
    this.produkty = p_produkty;
  }
}
