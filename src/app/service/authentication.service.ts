import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CrudService} from './crud.service';

export class User {
  constructor(public status: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private service: CrudService) {
  }

  isUser: string;

  authenticate(username, password) {
    return this.httpClient
      .post<any>('http://localhost:9090/authenticate', {username, password})
      .pipe(
        map(userData => {
          sessionStorage.setItem('username', username);
          this.service.auth().subscribe(data => {
            this.isUser = data;
            sessionStorage.setItem('auth', data);
          });
          const tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        })
      );
  }

  refreshAuth(): void {
    this.service.auth().subscribe(data => sessionStorage.setItem('auth', data));
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);

  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('auth');
  }

  isAdminAuthenticated(): any {
    return sessionStorage.getItem('auth') === '[ROLE_ADMIN]' && this.isUserLoggedIn();
  }
}
