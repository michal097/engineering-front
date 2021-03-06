import {Component, OnInit} from '@angular/core';
import {ConnectHeaderSeachService} from '../service/connect-header-seach.service';
import {Router} from '@angular/router';
import {Client} from '../client/client.component';
import {SearchSService} from '../search-s.service';

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

  constructor(private service: SearchSService, private searchConnector: ConnectHeaderSeachService, private router: Router) {
  }

  ngOnInit() {
    this.invoice = null;
    this.searchConnector.currentData.subscribe(currentData => {
        if (currentData === '' || currentData == null) {
          this.router.navigate(['']).then();
        } else {
          this.getInvoicesSearchResult(currentData);
          this.getClientsSearchResults(currentData);
          this.getExternalClientsSearchResults(currentData);
        }
      }
    );
  }

  retrieveUserData(id): void {
    this.router.navigate(['emplyeeDetails', `${id}`]);
  }

  getInvoicesSearchResult(phrase): void {
    this.service.retrieveInvoicesSearch(phrase).subscribe(data => {
      this.invoice = data;
      this.isAnySearchResultsInv = data.length > 0;
      console.log(this.isAnySearchResultsInv);
    });
  }

  getClientsSearchResults(phrase): void {
    this.service.retrieveClientsSearch(phrase).subscribe(data => {
      this.isAnySearchResultsCli = data.length > 0;
      this.employee = data;
    });
  }

  getExternalClientsSearchResults(phrase): void {
    this.service.retrieveExternalClientsSearch(phrase).subscribe(data => {
      this.isAnySearchResultsExt = data.length > 0;
      this.externalEmployee = data;
    });
  }
}
