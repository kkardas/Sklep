export class Promotion {
  produkty: Array<string>;
  obnizka: number;
  czasTrwania: number;

  public constructor (p_produkty: Array<string>,
                      p_obnizka: number,
                      p_czasTrwania: number) {
    this.produkty = p_produkty;
    this.obnizka = p_obnizka;
    this.czasTrwania = p_czasTrwania;
  }
}
