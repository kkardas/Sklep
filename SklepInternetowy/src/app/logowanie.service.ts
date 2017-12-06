import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {KoszykService} from "./koszyk.service";

@Injectable()
export class LogowanieService {
  usersUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/login';

  constructor(private http: HttpClient,
              private router: Router,
              private koszykService: KoszykService) { }

  public zaloguj(login: string, password: string) {
    let body: HttpParams = new HttpParams();
    body = body.append('username', login);
    body = body.append('password', password);

    this.http.post(this.usersUrl, body, {observe: 'response'})
      .subscribe(
        response => {
          this.handleSuccessResp(response.status, response.body, login);
        },
        error => {
          alert('Niepoprawny login i/lub hasło');
          console.log(JSON.stringify(error.json()));
        }
      );
  }

  private handleSuccessResp(status: number, body: Object, login: string) {
    if (200 === status) {
      localStorage.setItem('token', body['token']);
      localStorage.setItem('username', login);
      this.koszykService.wczytajKoszyk(login);
      alert('Witaj ' + login);
      this.router.navigate(['/front']);
    }
  }
}
