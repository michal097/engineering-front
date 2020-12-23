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
  isUserAuth: boolean;

// Provide username and password for authentication, and once authentication is successful,
// store JWT token in session
  authenticate(username, password) {
    return this.httpClient
      .post<any>('http://localhost:9090/authenticate', {username, password})
      .pipe(
        map(userData => {
          sessionStorage.setItem('username', username);
          this.service.auth().subscribe(data => this.isUser = data);
          const tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);

  }

  logOut() {
    sessionStorage.removeItem('username');
  }

}
