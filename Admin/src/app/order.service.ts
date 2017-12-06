import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Order} from './Order';
import {Product} from './Product';
import {UserService} from './user.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class OrderService {
  ordersUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/orders';

  constructor(private http: HttpClient,
              private userService: UserService) { }

  getNotRealizedOrders(): Observable<Array<Order>> {
    let params = new HttpParams().set('token', this.userService.getToken());
    params = params.append('realized', 'false');
    const options = {
      params: params,
      realized: false
    };
    return this.http.get<Array<Order>>(this.ordersUrl, options);
  }

  getRealizedOrders(): Observable<Array<Order>> {
    let params = new HttpParams().set('token', this.userService.getToken());
    params = params.append('realized', 'true');
    const options = {
      params: params
    };
    return this.http.get<Array<Order>>(this.ordersUrl, options);
  }

  changeStatus(order: Order): Observable<Order> {
    let params = new HttpParams().set('token', this.userService.getToken());
    const options = {
      params: params
    };
    order.zrealizowane = true;
    return this.http.put<Order>(`${this.ordersUrl}/${order._id}`, order, options).pipe(
      tap(_ => console.log(`status of order id=${order._id} changed`)),
      catchError(this.handleError<Order>('updateProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

