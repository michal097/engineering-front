import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationService} from './service/authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAndModeratorAuthService {
  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean
    | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAdminAuthenticated()) {
      return true;
    } else if (this.authService.isModeratorAuthenticated()) {

      return true;
    } else {
      this.router.navigate(['login']).then(() => console.log('you are not an admin'));
    }
  }
}
