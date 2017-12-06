import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';

@Injectable()
export class LoggingGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.userService.getToken())
    console.log(this.userService.getUserName());
    if (this.userService.getToken() !== '' && this.userService.getUserName() === 'admin') {
      return true;
    }
    this.router.navigate(['admin']);
  }
}
