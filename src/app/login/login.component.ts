import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {CrudService} from '../service/crud.service';
import {getIndexInputFile} from "@angular-devkit/build-angular/src/utils/webpack-browser-config";


export class User {
  constructor(public username: string,
              public password: string,
              public roles: Role[]) {
  }
}

export class Role {
  constructor(public description: string,
              public role: string) {
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username = '';
  password = '';
  passwordRepeat = null;
  invalidLogin = false;
  invalidPass = '';
  userGeneratedMessage = '';
  err = '';
  error = '';
  user: User;
  roles: Role[];

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private service: CrudService) {
  }

  ngOnInit() {
    this.user = new User(null, null, this.roles);
  }


  register(pass): boolean {

    if (pass !== this.passwordRepeat) {
      this.invalidPass = 'You entered different passwords';
      return false;
    } else {
      this.invalidPass = '';
      return true;
    }
  }

  saveUser(): void {
    this.invalidPass = '';
    this.err = '';
    this.userGeneratedMessage = '';
    if (this.register(this.user.password)) {
      this.service.register(this.user).subscribe(
        () => this.success(),
        () => this.errors()
      );
    }
  }

  success() {
    this.invalidPass = '';
    this.userGeneratedMessage = 'User has been geenrated!';
    this.err = '';
  }

  errors() {
    if (this.user.username === undefined || this.user.username === ''
      || this.user.password === '' || this.user.password === undefined ||
      this.user.username === null || this.user.password === null) {
      this.err = 'Username and password cannot be empty';
    } else {
      this.err = 'Wrong username you cannot create account by yourself!';
    }
    this.userGeneratedMessage = '';
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
        if (this.username === undefined || this.username === ''
          || this.password === '' || this.password === undefined) {
          this.error = 'Username and password cannot be empty';
        } else {
          this.error = 'invalid username or password';
        }
      }
    );
  }
}
