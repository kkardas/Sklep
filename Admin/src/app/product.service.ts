import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Product} from './Product';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable()
export class ProductService {
  productsUrl = 'https://limitless-wildwood-76625.herokuapp.com/api/products';

  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) { }

  getAllProducts(): Observable<Array<Product>> {
    const params = new HttpParams().set('token', this.userService.getToken());
    const options = {
      params: params
    };
    return this.http.get<Array<Product>>(this.productsUrl, options);
  }

  getProductById(id: string): Observable<Product> {
    const params = new HttpParams().set('token', this.userService.getToken());
    const options = {
      params: params
    };
    return this.http.get<Product>(`${this.productsUrl}/${id}`, options);
  }

  deleteFromDatabase(id: string): Observable<Product> {
    const params = new HttpParams().set('token', this.userService.getToken());
    const options = {
      params: params
    };
    return this.http.delete<Product>(`${this.productsUrl}/${id}`, options).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  updateInDatabase(product: Product): Observable<any> {
    const params = new HttpParams().set('token', this.userService.getToken());
    const options = {
      params: params
    };
    return this.http.put(`${this.productsUrl}/${product._id}`, product, options).pipe(
      tap(_ => console.log(`updated product id=${product._id}`)),
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  addToDatabase(product: Product): Observable<any> {
    const params = new HttpParams().set('token', this.userService.getToken());
    return this.http.post<Product>(this.productsUrl, product, {observe: 'response',
                                                                      params: params}).pipe(
      tap(_ => console.log(`added product id=${product._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  private handleSuccessResp(status: number, login: string) {
    if (200 === status) {
      this.router.navigate(['/main']);
    }
  }
}
