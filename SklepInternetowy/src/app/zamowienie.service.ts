import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Zamowienie} from './Zamowienie';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {KoszykService} from './koszyk.service';
import {ProduktWZamowieniu} from './ProduktWZamowieniu';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ZamowienieService {
  zamowieniaUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/orders';

  constructor(private http: HttpClient,
              private koszykService: KoszykService,
              private router: Router) { }

  wrzucZamowienieDoBazy(nazwisko: string, adres: string): Observable<Zamowienie> {
    let produ = new Array<ProduktWZamowieniu>();
    this.koszykService.getProduktyDoZamowienia()
      .subscribe(produktyWKoszyku => produ = produktyWKoszyku);
    let wartosc = 0;
    this.koszykService.getSumaWartosciWKoszyku()
      .subscribe(sumaWartosciWKoszyku => wartosc = sumaWartosciWKoszyku);
    let imieINazwisko = nazwisko.split(' ');
    let tempZamowienie = new Zamowienie(imieINazwisko[0],
                                        imieINazwisko[1],
                                        adres,
                                        wartosc,
                                        produ);
    console.log(localStorage.getItem('username'))
    console.log(localStorage.getItem('login'))
    if (localStorage.getItem('username')) {
      tempZamowienie.login = localStorage.getItem('username');
    }
    return this.http.post<Zamowienie>(this.zamowieniaUrl, tempZamowienie, httpOptions)
      .pipe(
        tap((zamowienie: Zamowienie) => this.logSuccess(`added zamowienie`)),
        catchError(this.handleError<Zamowienie>('addZamowienie'))
      );
  }

  getZamowienia(login: string): Observable<Array<Zamowienie>> {
    let params = new HttpParams().set('username', login);
    params = params.append('token', localStorage.getItem('token'));
    const options = {
      params: params
    };
    return this.http.get<Array<Zamowienie>>(`${this.zamowieniaUrl}/username/${login}`, options);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.logFailure(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private logFailure(message: string) {
    alert('Nie udało się dokonać zamówienia, błąd bazy danych');
    console.log(message);
  }

  private logSuccess(message: string) {
    alert("Dziękuję za złożenie zamówienia");
    console.log(message);
    this.koszykService.wyczyscKoszyk();
    this.router.navigate(['/front']);
  }
}
