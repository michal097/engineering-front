import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {CrudService} from '../service/crud.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ConnectHeaderSeachService} from '../service/connect-header-seach.service';
import {Client} from '../client/client.component';
import {datepickerAnimation} from "ngx-bootstrap/datepicker/datepicker-animations";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isUser: string;
  isAuthUser: boolean;
  isAuthAdmin: boolean;
  isAuthModerator: boolean;
  isLoggedIn = false;
  search: FormControl = new FormControl();
  invoice: Client[];
  hidden = false;
  userId: string;

  constructor(public loginService: AuthenticationService,
              private service: CrudService,
              private router: Router,
              private searchConnect: ConnectHeaderSeachService) {
  }


  ngOnInit() {


    window.addEventListener('scroll', this.scroll, true);

    this.checkAuth();
    setInterval(() => {
      this.getUsername();
      this.checkAuth();
    }, 10);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  getUsername(): void {
    this.service.getUsername().subscribe(data => {
      this.userId = 'emplyeeDetails/' + data;
    });

  }

  checkAuth() {
    this.service.auth().subscribe(data => {
      this.isUser = data;
    });
    this.isAuthUser = this.isUser === '[ROLE_USER]';
    this.isAuthAdmin = this.isUser === '[ROLE_ADMIN]';
    this.isAuthModerator = this.isUser === '[ROLE_MODERATOR]';
    this.isLoggedIn = this.isUser === '[ROLE_USER]' || this.isUser === '[ROLE_ADMIN]' || this.isUser === '[ROLE_MODERATOR]';
  }


  scroll = (event): void => {

    window.pageYOffset >= 40 ? document.getElementById('navs').style.opacity = String(0.9)
      : document.getElementById('navs').style.opacity = String(1);

    window.pageYOffset >= 40 ? document.getElementById('navs').style.boxShadow = '0 4px 4px 0 '
      : document.getElementById('navs').style.boxShadow = '';
  }

  searchPhrase(): void {

    this.router.navigate(['search']);
    this.searchConnect.updateMessage(this.search.value);
    // clear search phrase
    this.search = new FormControl();


  }


}
