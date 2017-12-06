import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-pasek-boczny',
  templateUrl: './pasek-boczny.component.html',
  styleUrls: ['./pasek-boczny.component.css']
})
export class PasekBocznyComponent implements OnInit {
  @Input() kategorie: Set<string>;
  @Input() wybraneKategorie: Set<string>;
  @Output() kategoria: EventEmitter<string> = new EventEmitter<string>();
  @Output() filtNazwy: EventEmitter<string> = new EventEmitter<string>();
  @Output() szukajFiltr: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() minCena: EventEmitter<number> = new EventEmitter<number>();
  @Output() maxCena: EventEmitter<number> = new EventEmitter<number>();

  szukanaNazwa: string;
  minimalnaCena: number;
  maksymalnaCena: number;

  constructor() {
    this.szukanaNazwa = '';
    this.minimalnaCena = 0;
    this.maksymalnaCena = 0;
  }

  public zmienKategorie(kategoria: string) {
    this.kategoria.emit(kategoria);
  }

  public sprawdzKategorie(kategoria: string) {
    return this.wybraneKategorie.has(kategoria);
  }

  public szukaj() {
    this.szukajFiltr.emit(true);
  }

  public zmienFiltr() {
    this.filtNazwy.emit(this.szukanaNazwa);
  }

  public stronaGlowna() {
    this.kategoria.emit('Str');
  }

  public wyslijMin() {
    this.minCena.emit(this.minimalnaCena);
  }

  public wyslijMax() {
    this.maxCena.emit(this.maksymalnaCena);
  }

  ngOnInit() {
  }

}
