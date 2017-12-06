export class ProductInDetails {
  nazwa: string;
  cena: number;
  ilosc: number;

  constructor(p_nazwa: string,
              p_cena: number,
              p_ilosc: number) {
    this.nazwa = p_nazwa;
    this.cena = p_cena;
    this.ilosc = p_ilosc;
  }
}
