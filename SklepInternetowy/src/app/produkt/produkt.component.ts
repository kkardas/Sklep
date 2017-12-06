import {Component, Input, OnInit} from '@angular/core';
import {Produkt} from "../Produkt";
import {KoszykService} from "../koszyk.service";

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css'],
})
export class ProduktComponent implements OnInit {
  @Input() produkt: Produkt;
  modal: boolean;

  constructor(private koszykService: KoszykService) {
    this.modal = false;
  }

  public dodajDoKoszyka(id: string) {
    this.koszykService.dodajDoKoszyka(id);
  }

  ngOnInit() {
  }

}
