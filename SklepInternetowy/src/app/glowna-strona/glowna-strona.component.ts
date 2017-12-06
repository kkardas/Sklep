import {Component, OnInit} from '@angular/core';
import {ProduktService} from "../produkt.service";
import {Produkt} from "../Produkt";
import {KoszykService} from "../koszyk.service";

@Component({
  selector: 'app-glowna-strona',
  templateUrl: './glowna-strona.component.html',
  styleUrls: ['./glowna-strona.component.css']
})
export class GlownaStronaComponent implements OnInit {
  kategorie: Array<string>;
  produkty: Produkt[];
  wybrano: boolean;
  wybraneKategorie: Set<string>;
  minimalnaCena: number;
  maksymalnaCena: number;
  filtrNazwy: string;

  constructor(private produktService: ProduktService,
              private koszykService: KoszykService) {
    this.wybrano = false;
    this.wybraneKategorie = new Set<string>();
    this.produkty = new Array<Produkt>();
    this.minimalnaCena = -1;
    this.maksymalnaCena = -1;
    this.filtrNazwy = '';
  }

  public getKategorie() {
    this.produktService.getKategorie()
      .subscribe(kategorie => this.kategorie = kategorie);
  }

  public getProd() {
    this.produktService.getProduktyDlaKategorii(
      Array.from(this.wybraneKategorie),
      this.minimalnaCena,
      this.maksymalnaCena,
      this.filtrNazwy)
      .subscribe(produkty => this.produkty = produkty);
  }

  public zapiszFiltr(filtrNazwy: string) {
    this.filtrNazwy = filtrNazwy;
  }

  public zmienionoKategorie(kategoria: string) {
    if (kategoria === 'Str') {
      this.wybrano = false;
      this.wybraneKategorie.clear();
      return;
    }
    this.wybrano = true;

    if (this.wybraneKategorie.has(kategoria)) {
      this.wybraneKategorie.delete(kategoria);
    } else {
      this.wybraneKategorie.add(kategoria);
    }
    this.produkty = [];
    this.getProd();
  }

  public zapiszMin(minCena: number) {
    this.minimalnaCena = minCena;
  }

  public zapiszMax(maxCena: number) {
    if (maxCena == null) {
      this.maksymalnaCena = -1;
    } else {
      this.maksymalnaCena = maxCena;
    }
  }

  ngOnInit() {
    this.getKategorie();
    if (localStorage.getItem('username')) {
      this.koszykService.wczytajKoszyk(localStorage.getItem('username'));
    }
  }

}
