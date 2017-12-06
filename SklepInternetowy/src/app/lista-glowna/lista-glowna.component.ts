import {Component, Input, OnInit} from '@angular/core';
import {Produkt} from "../Produkt";

@Component({
  selector: 'app-lista-glowna',
  templateUrl: './lista-glowna.component.html',
  styleUrls: ['./lista-glowna.component.css']
})
export class ListaGlownaComponent implements OnInit {
  @Input() produkty: Produkt[];
  @Input() wybrano: boolean;

  constructor() { }

  ngOnInit() {
  }

}
