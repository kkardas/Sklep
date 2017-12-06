import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  login: string;
  password: string;

  constructor(private loginService: LoginService) {
    this.login = '';
    this.password = '';
  }

  public LogIn() {
    this.loginService.LogIn(this.login, this.password);
  }

  ngOnInit() {
  }

}
