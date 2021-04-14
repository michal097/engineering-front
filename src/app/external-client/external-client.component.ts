import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {ExternalClient} from '../all-clients/all-clients.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Invoice} from '../invoice/invoice.component';

@Component({
  selector: 'app-external-client',
  templateUrl: './external-client.component.html',
  styleUrls: ['./external-client.component.scss']
})
export class ExternalClientComponent implements OnInit {

  externalClient: ExternalClient;
  externalId: string;
  invoices: Invoice[];
  externalLen: number;

  constructor(private service: CrudService, private snap: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.externalId = this.snap.snapshot.params.id;
    this.getExternalClientData(this.externalId);
    this.getExternalClientInvs(this.externalId);
  }

  getExternalClientData(id): void {
    this.service.getExternalClient(id).subscribe(data => this.externalClient = data);
  }

  getExternalClientInvs(id): void {
    this.service.getExternalClientInvoices(id).subscribe(data => {
      this.invoices = data;
      console.log(data);
      this.externalLen = this.invoices.length;
    });
  }

  navigateToInvoice(id): void {
    console.log(this.invoices);
    this.router.navigate(['invoice', `${id}`]);
  }

}
