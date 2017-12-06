import {Injectable} from '@angular/core';
import {ProduktService} from "./produkt.service";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Produkt} from "./Produkt";
import {ProduktWZamowieniu} from "./ProduktWZamowieniu";
import {Koszyk} from "./Koszyk";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class KoszykService {
  basketsUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/baskets';

  produktyWKoszyku: Map<string, number>;
  sumaWartosci: number;
  iloscWKoszyku: number;

  constructor(private produktService: ProduktService,
              private http: HttpClient) {
    this.produktyWKoszyku = new Map<string, number>();
    this.sumaWartosci = 0;
    this.iloscWKoszyku = 0;
  }

  public getSumaWartosciWKoszyku(): Observable<number> {
    return of(this.sumaWartosci);
  }

  public getIloscPrzedmiotowWKoszyku(): Observable<number> {
    return of(this.iloscWKoszyku);
  }

  public getIlosc(id: string): Observable<number> {
    return of(this.produktyWKoszyku.get(id));
  }

  private zwiekszSume(id: string) {
    return this.produktService.getProdukt(id);
  }

  private zmniejszSume(ilosc: number, cena: number, promocja: number) {
    this.sumaWartosci -= ilosc * (cena - cena * promocja / 100);
  }

  private zwiekszIloscWKoszyku() {
    this.iloscWKoszyku += 1;
  }

  private zmniejszIloscWKoszyku(ilosc: number) {
    this.iloscWKoszyku -= ilosc;
  }

  public usunZKoszyka(id: string) {
    if (this.produktyWKoszyku.has(id)) {
      const ilosc = this.produktyWKoszyku.get(id);
      this.produktyWKoszyku.delete(id);
      this.zmniejszIloscWKoszyku(ilosc);
      this.produktService.getProdukt(id)
        .subscribe(produkt => {
          this.zmniejszSume(ilosc, produkt.cena, produkt.promocja);
          if (localStorage.getItem('username')) {
            this.aktualizujKoszyk()
              .subscribe();
          }
        });
    }
  }

  public dodajDoKoszyka(id: string) {
    if (this.produktyWKoszyku.has(id)) {
      const ilosc = this.produktyWKoszyku.get(id);
      this.produktyWKoszyku.set(id, ilosc + 1);
    } else {
      this.produktyWKoszyku.set(id, 1);
    }
    this.zwiekszSume(id)
      .subscribe(produkt => {
        this.sumaWartosci += produkt.cena - produkt.cena * produkt.promocja / 100;
        this.zwiekszIloscWKoszyku();
        if (localStorage.getItem('username')) {
          this.aktualizujKoszyk()
            .subscribe();
        }
      });
  }

  public getProdukty(): Observable<Array<Produkt>> {
    const produkty = [];
    const produktService = this.produktService;
    this.produktyWKoszyku.forEach(function (ilosc, id) {
      produktService.getProdukt(id)
        .subscribe(produkt => produkty.push(produkt));
    });
    return of(produkty);
  }

  public getProduktyDoZamowienia(): Observable<Array<ProduktWZamowieniu>>{
    const produkty = [];
    this.produktyWKoszyku.forEach(function (ilosc, id) {
      produkty.push(new ProduktWZamowieniu(id, ilosc));
    });
    return of(produkty);
  }

  public wyczyscKoszyk() {
    this.produktyWKoszyku = new Map<string, number>();
    this.sumaWartosci = 0;
    this.iloscWKoszyku = 0;
    this.aktualizujKoszyk();
  }

  public wyloguj() {
    this.produktyWKoszyku = new Map<string, number>();
    this.sumaWartosci = 0;
    this.iloscWKoszyku = 0;
  }

  public aktualizujKoszyk() {
    let params = new HttpParams().set('login', localStorage.getItem('username'));
    params = params.append('token', localStorage.getItem('token'));

    const options = {
      params: params
    };

    let produkty = new Array<ProduktWZamowieniu>();
    this.getProduktyDoZamowienia()
      .subscribe(produktyWKoszyku => produkty = produktyWKoszyku);
    let koszyk = new Koszyk();
    koszyk.iloscWKoszyku = this.iloscWKoszyku;
    koszyk.sumaWartosci = this.sumaWartosci;
    koszyk.produktyWKoszyku = produkty;

    return this.http.put<Koszyk>(this.basketsUrl, koszyk, options)
      .pipe(
        tap((koszykk: Koszyk) => this.logSuccess(`Koszyk zaktualizowany`)),
        catchError(this.handleError<Koszyk>('addZamowieni'))
      );
  }

  public wczytajKoszyk(login: string) {
    let params = new HttpParams().set('login', login);
    params = params.append('token', localStorage.getItem('token'));
    const options = {
      params: params
    };
    this.http.get<Koszyk>(this.basketsUrl, options)
      .subscribe(koszyk => {this.iloscWKoszyku = koszyk.iloscWKoszyku;
                             this.sumaWartosci = koszyk.sumaWartosci;
                             koszyk.produktyWKoszyku
                               .map(produkt => this.produktyWKoszyku.set(produkt.produktId,
                                                                         produkt.ilosc));
      });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  private logSuccess(message: string) {
    console.log(message);
  }
}
