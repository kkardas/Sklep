export class ProduktWZamowieniu {
  produktId: string;
  ilosc: number;

  constructor(p_id: string,
              p_ilosc: number) {
    this.produktId = p_id;
    this.ilosc = p_ilosc;
  }
}
