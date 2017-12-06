import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Produkt} from './Produkt';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class ProduktService {
  produktyUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/products';
  kategorieUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/kategorie';

  constructor(private http: HttpClient) {
  }

  getKategorie(): Observable<Array<string>> {
    return this.http.get<string[]>(this.kategorieUrl)
      .pipe(
        tap((kategoria: string[]) => this.logSuccess(`pobrano kategorie`)),
        catchError(this.handleError<string[]>(''))
      );
  }

  getProduktyDlaKategorii(kategoria: Array<string>,
                          min: number,
                          max: number,
                          filtr: string): Observable<Array<Produkt>> {
    let params = new HttpParams();
    if (kategoria.length > 0) {
      kategoria.map(kat => {
        params = params.append('kategoria', kat);
    });
    }
    if (min > 0) {
      params = params.append('min', min.toString());
    }
    if (max > 0) {
      params = params.append('max', max.toString());
    }
    if (filtr !== '') {
      params = params.append('filtr', filtr);
    }
    const options = {
      params: params
    };
    return this.http.get<Produkt[]>(`${this.produktyUrl}/min/${min}/max/${max}`, options)
      .pipe(
        tap((produkt: Produkt[]) => this.logSuccess(`pobrano produkty dla kategorii: ${kategoria}}`)),
        catchError(this.handleError<Produkt[]>(''))
      );
  }

  getProdukt(id: string): Observable<Produkt> {
    return this.http.get<Produkt>(`${this.produktyUrl}/${id}`)
      .pipe(
        tap((produkt: Produkt) => this.logSuccess(`pobrano produkt ${id}}`)),
        catchError(this.handleError<Produkt>(''))
      );
  }

  getProductById(id: string): Observable<Produkt> {
    const params = new HttpParams().set('token', localStorage.getItem('token'));
    const options = {
      params: params
    };
    return this.http.get<Produkt>(`${this.produktyUrl}/${id}`, options);
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
