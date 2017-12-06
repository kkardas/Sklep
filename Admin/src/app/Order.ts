import {ProductInOrder} from './ProductInOrder';

export class Order {
  imie: string;
  nazwisko: string;
  adres: string;
  wartosc: number;
  produkty: Array<ProductInOrder>;
  zrealizowane: boolean;
  _id: string;

  constructor(p_imie: string,
              p_nazwisko: string,
              p_adres: string,
              p_wartosc: number,
              p_produkty: Array<ProductInOrder>,
              p_id: string) {
    this.imie = p_imie;
    this.nazwisko = p_nazwisko;
    this.adres = p_adres;
    this.wartosc = p_wartosc;
    this.produkty = p_produkty;
    this.zrealizowane = false;
    this._id = p_id;
  }
}
