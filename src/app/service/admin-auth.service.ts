import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean
    | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAdminAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']).then(() => console.log('you are not an admin'));
      return false;
    }
  }
}
