import { Component, OnInit } from '@angular/core';
import {LogowanieService} from "../logowanie.service";

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {
  login: string;
  haslo: string;

  constructor(private logService: LogowanieService) {
    this.login = '';
    this.haslo = '';
  }

  ngOnInit() {
  }

  public zaloguj() {
    this.logService.zaloguj(this.login, this.haslo);
  }
}
