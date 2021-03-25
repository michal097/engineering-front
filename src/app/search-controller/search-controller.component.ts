import {Component, OnInit} from '@angular/core';
import {ConnectHeaderSeachService} from '../service/connect-header-seach.service';
import {Router} from '@angular/router';
import {Client} from '../client/client.component';
import {SearchSService} from '../search-s.service';
import {PageEvent} from "@angular/material/paginator";

export class Employee {
  username: string;
  name: string;
  surname: string;
  nip: string;
  email: string;

}

export class ExternalEmployee {
  username: string;
  name: string;
  surname: string;
  nip: string;
  email: string;

}

@Component({
  selector: 'app-search-controller',
  templateUrl: './search-controller.component.html',
  styleUrls: ['./search-controller.component.scss']
})

export class SearchControllerComponent implements OnInit {

  invoice: Client[];
  employee: Employee[];
  externalEmployee: ExternalEmployee[];
  isAnySearchResultsInv: boolean;
  isAnySearchResultsCli: boolean;
  isAnySearchResultsExt: boolean;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  invoiceLength: number;
  clientLen: number;
  externalLen: number;
  currentPhrase: string;

  constructor(private service: SearchSService, private searchConnector: ConnectHeaderSeachService, private router: Router) {
  }

  ngOnInit() {

    this.invoice = null;
    this.searchConnector.currentData.subscribe(currentData => {
        this.currentPhrase = currentData;
        console.log(currentData);
        if (currentData === '' || currentData == null) {
          this.router.navigate(['']);
        } else {
          this.isAnySearchResultsInv = false;
          this.isAnySearchResultsCli = false;
          this.isAnySearchResultsExt = false;
          this.service.retrieveInvoicesSearch(currentData, 0, this.pageSize).subscribe(data => {
            this.invoice = data;
            this.invLens();
            this.isAnySearchResultsInv = data.length > 0;
          });
          this.service.retrieveClientsSearch(currentData, 0, this.pageSize).subscribe(data => {
            this.employee = data;
            this.clLen();
            this.isAnySearchResultsCli = data.length > 0;

          });
          this.service.retrieveExternalClientsSearch(currentData, 0, this.pageSize).subscribe(data => {
            this.externalEmployee = data;
            this.extClLen();
            this.isAnySearchResultsExt = data.length > 0;
          });

        }
      }
    );
  }

  retrieveUserData(id): void {
    this.router.navigate(['emplyeeDetails', `${id}`]);
  }

  routeToInvoice(id): void {
    this.router.navigate(['invoice', `${id}`]);
  }

  navigateToExternalClient(id): void {
    this.router.navigate(['external', `${id}`]);
  }

  invLens(): void {
    // tslint:disable-next-line:radix
    this.service.invoiceLength().subscribe(data => this.invoiceLength = parseInt(data));
  }

  clLen(): void {
    // tslint:disable-next-line:radix
    this.service.clientLen().subscribe(data => this.clientLen = parseInt(data));
  }

  extClLen(): void {
    // tslint:disable-next-line:radix
    this.service.externalLen().subscribe(data => this.externalLen = parseInt(data));
  }

  getInvoicesSearchResult(phrase, e): void {
    this.service.retrieveInvoicesSearch(phrase, e.pageIndex, e.pageSize).subscribe(data => {
      this.invoice = data;
    });
  }

  getClientsSearchResults(phrase, e): void {
    this.service.retrieveClientsSearch(phrase, e.pageIndex, e.pageSize).subscribe(data => {
      this.employee = data;
    });
  }

  getExternalClientsSearchResults(phrase, e): void {
    this.service.retrieveExternalClientsSearch(phrase, e.pageIndex, e.pageSize).subscribe(data => {
      this.externalEmployee = data;
    });
  }

}
