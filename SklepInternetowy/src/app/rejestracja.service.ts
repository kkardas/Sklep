import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {KoszykService} from "./koszyk.service";

@Injectable()
export class RejestracjaService {
  registerUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/register';

  constructor(private http: HttpClient,
              private router: Router) { }

  public zarejestruj(login: string,
                     haslo: string) {
    let body: HttpParams = new HttpParams();
    body = body.append('username', login);
    body = body.append('password', haslo);

    this.http.post(this.registerUrl, body, {observe: 'response'})
      .subscribe(
        response => {this.handleSuccessResp(response.status); },
        error => {
          if (error.error.message === 'Write a password') {
            alert('Wpisz hasło');
          } else if (error.error.message === 'Username already in db') {
            alert('Podany login jest zajęty');
          } else {
            alert('Błąd rejestracji');
          }          console.log(JSON.stringify(error.json()));
        }
      );
  }

  private handleSuccessResp(status: number) {
    if (200 === status) {
      this.router.navigate(['/front']);
    }
  }
}
