export class Product {
  nazwa: string;
  opis: string;
  cena: number;
  kategoria: string;
  zdjecie: Array<string>;
  _id: string;

  public constructor (p_nazwa: string,
                      p_opis: string,
                      p_cena: number,
                      p_kategoria: string,
                      p_url: Array<string>,
                      p_id: string) {
    this.nazwa = p_nazwa;
    this.opis = p_opis;
    this.cena = p_cena;
    this.kategoria = p_kategoria;
    this.zdjecie = p_url;
    this._id = p_id;
  }
}
