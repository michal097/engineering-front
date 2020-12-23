import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {CrudService} from '../service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isUser: string;
  isAuth: boolean;

  constructor(public loginService: AuthenticationService,
              private service: CrudService) {
  }

  ngOnInit() {
    this.checkAuth();
    setInterval(() => {
      this.checkAuth();
    }, 10);
  }

  checkAuth() {
    this.service.auth().subscribe(data => this.isUser = data);
    this.isAuth = this.isUser === '[ROLE_USER]';
  }
}
