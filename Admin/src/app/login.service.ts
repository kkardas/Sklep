import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class LoginService {
  usersUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/login';
  respS: number;
  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService) {
    this.respS = 0;
  }

  public LogIn(login: string, password: string) {
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
      this.userService.setToken(body['token']);
      localStorage.setItem('adminToken', body['token']);
      this.userService.setIsUserLoggedIn(true);
      this.userService.setUserName(login);
      this.router.navigate(['admin/main']);
    }
  }

}
