import {Component, OnInit} from '@angular/core';
import {CrudService} from "../service/crud.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isUser: string;
  isAuthenticatedAsUser: boolean;

  constructor(private service: CrudService) {
  }

  ngOnInit() {
    this.checkAuth();
    this.isAuthenticatedAsUser = this.isUser === '[ROLE_USER]';
  }

  checkAuth() {
    this.service.auth().subscribe(data => this.isUser = data);
  }
}
