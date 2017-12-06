import {Component, OnInit} from '@angular/core';
import {ZamowienieService} from "../zamowienie.service";

@Component({
  selector: 'app-zamowienie',
  templateUrl: './zamowienie.component.html',
  styleUrls: ['./zamowienie.component.css']
})
export class ZamowienieComponent implements OnInit {
  nazwisko: string;
  adres: string;

  constructor(private zamowienieService: ZamowienieService) {
    this.nazwisko = "";
    this.adres = "";
  }

  public dokonajZamowienia() {
    let tempZamowienie;
    this.zamowienieService.wrzucZamowienieDoBazy(this.nazwisko, this.adres)
      .subscribe(zam => tempZamowienie = zam);
  }

  ngOnInit() {
  }
}
