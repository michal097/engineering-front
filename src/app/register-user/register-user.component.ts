import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';

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
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  user: User;
  roles: Role[];

  userGeneratedMessage: string;
  err: string;

  constructor(private service: CrudService) {
  }

  ngOnInit() {

    this.user = new User(null, null, this.roles);
    console.log('user in ng init ' + this.user);
  }

  saveUser(): void {
    console.log(this.user);
    this.service.register(this.user).subscribe(
      () => this.success(),
      () => this.error()
    );
  }

  success() {
    this.userGeneratedMessage = 'User has been geenrated! -> try to log in!';
    this.err = '';
  }

  error() {
    this.err = 'Wrong usernamem you cannot create account by yourself!';
    this.userGeneratedMessage = '';
  }
}
