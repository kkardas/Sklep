import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserService} from './user.service';
import {Promotion} from './Promotion';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DiscountService {
  promotion: Promotion;
  promotionsUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/promotions';

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.promotion = new Promotion(new Array<string>(), 0, 0);
  }

  public addToDiscount(id: string) {
    if (this.promotion.produkty.includes(id)) {
      this.promotion.produkty.splice(this.promotion.produkty.indexOf(id), 1);
    } else {
      this.promotion.produkty.push(id);
    }
    console.log(this.promotion.produkty);
  }

  public addPromotion(): Observable<any> {
    const params = new HttpParams().set('token', this.userService.getToken());
    console.log(this.promotion.produkty);

    return this.http.post<Promotion>(this.promotionsUrl, this.promotion, {observe: 'response',
                                                                          params: params}).pipe(
      tap(_ => console.log(`added promotion id=${this.promotion.obnizka}`)),
      catchError(this.handleError<Promotion>('addPromotion'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
