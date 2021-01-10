import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;

  error: string;

  constructor(private router: Router,
              private loginservice: AuthenticationService) {
  }

  ngOnInit() {
  }

  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['']);
        this.loginservice.refreshAuth();
        this.invalidLogin = false;
      },
      () => {
        this.invalidLogin = true;
        this.error = 'invalid username or password';

      }
    );
  }
}
