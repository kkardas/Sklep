import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  isUserLoggedIn: boolean;
  userName: string;
  token: string;

  constructor() {
    this.isUserLoggedIn = false;
    this.userName = '';
    this.token = '';
  }

  getIsUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  getUserName() {
    return this.userName;
  }

  getToken() {
    return this.token;
  }

  setIsUserLoggedIn(isLogged: boolean) {
    this.isUserLoggedIn = isLogged;
  }

  setUserName(userName: string) {
    this.userName = userName;
  }

  setToken(token: string) {
    this.token = token;
  }
}
