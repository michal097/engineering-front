import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticatedAsUser: boolean;
  isAuthenticatedAsAdmin: boolean;
  isAuthenticatedAsModerator: boolean;
  userData: string;

  constructor(private service: CrudService, private router: Router) {
  }

  ngOnInit() {
    this.userData = '';
    this.checkAuth();

  }

  checkAuth() {
    this.service.auth().subscribe(data => {
      console.log(data);
      this.isAuthenticatedAsUser = data === '[ROLE_USER]';
      this.isAuthenticatedAsAdmin = data === '[ROLE_ADMIN]';
      this.isAuthenticatedAsModerator = data === '[ROLE_MODERATOR]';
    });
  }
  getUserData(): void {
    this.service.getUserNameAndSurname().subscribe(data => {
      this.userData = data;
    });
  }
}
