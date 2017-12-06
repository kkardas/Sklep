import {Component, OnInit} from '@angular/core';
import {RejestracjaService} from "../rejestracja.service";

@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css']
})
export class RejestracjaComponent implements OnInit {
  login: string;
  haslo: string;

  constructor(private rejService: RejestracjaService) {
    this.login = '';
    this.haslo = '';
  }

  ngOnInit() {
  }

  public zarejestruj() {
    this.rejService.zarejestruj(this.login, this.haslo);
  }
}
