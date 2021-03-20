import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Client} from '../client/client.component';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";

export class ExternalClient {
  externalClientId: string;
  name: string;
  surname: string;
  nip: string;
  bankAccNumber: string;
}

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit {

  constructor(private service: CrudService, private router: Router) {
  }

  clients: Client[];
  externalClients: ExternalClient[];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  extLen: number;

  ngOnInit() {
    this.allEmpL();
    this.allExternals();
    this.service.retrieveAllClients(0, this.pageSize).subscribe(data => this.clients = data);
    this.service.getAllExternalClients(0, this.pageSize).subscribe(data => this.externalClients = data);
  }

  allEmpL(): void {
    // tslint:disable-next-line:radix
    this.service.allEmpLen().subscribe(data => this.length = parseInt(data));
  }

  allExternals(): void {
    // tslint:disable-next-line:radix
    this.service.getAllExternalsLen().subscribe(data => this.extLen = parseInt(data));
  }

  retrieveUserData(id): void {
    this.router.navigate(['emplyeeDetails', `${id}`]);
  }

  getAllClients(e): any {
    this.service.retrieveAllClients(e.pageIndex, e.pageSize).subscribe(data => this.clients = data);
  }

  getAllExternals(e): void {
    this.service.getAllExternalClients(e.pageIndex, e.pageSize).subscribe(data => this.externalClients = data);
  }

  navigateToExternalClient(id): void {
    this.router.navigate(['external', `${id}`]);
  }

}
