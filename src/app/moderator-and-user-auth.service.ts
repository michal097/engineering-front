import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthenticationService} from "./service/authentication.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModeratorAndUserAuthService {
  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean
    | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserAuthenticated()) {
      return true;
    } else if (this.authService.isModeratorAuthenticated()) {

      return true;
    } else {
      this.router.navigate(['login']).then(() => console.log('you are not an moderator nor user'));
    }
  }
}
