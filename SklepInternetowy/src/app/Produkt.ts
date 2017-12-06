export class Produkt {
  _id: string;
  nazwa: string;
  opis: string;
  cena: number;
  kategoria: string;
  promocja: number;
  zdjecie: Array<string>;

  public constructor (p_nazwa: string,
                      p_opis: string,
                      p_cena: number,
                      p_kategoria: string,
                      p_id: string,
                      p_zdjecie: Array<string>) {
    this.nazwa = p_nazwa;
    this.opis = p_opis;
    this.cena = p_cena;
    this.kategoria = p_kategoria;
    this.zdjecie = p_zdjecie;
    this.promocja = 0;
    this._id = p_id;
  }
}
