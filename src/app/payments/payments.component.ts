import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CrudService} from "../service/crud.service";
import {Invoice} from "../invoice/invoice.component";
import {Client} from "../client/client.component";
import {Router} from "@angular/router";

export class Payment {

}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private http: HttpClient, private service: CrudService, private router: Router) {
  }

  invoices: Invoice[];
  payment: Payment;
  // paymentResponse: any;
  // IBAN: string;
  // amount: number;
  result: string;
  clients: Client[];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  ngOnInit() {
    this.getAllInvs();
  }

  // getInfo(): void {
  //   this.result = this.paymentResponse.outcome.seller_message;
  // }
  // chargeCard() {
  //
  //   this.http.get(`http://localhost:9090/payment/charge/${this.IBAN}/${this.amount}`)
  //     .subscribe(resp => {
  //       this.paymentResponse = resp;
  //       this.getInfo();
  //     });
  //   this.getInfo();
  // }

  getAllInvs(): void {
    this.service.getAllivoices().subscribe(data => this.invoices = data);
  }

  goToPayInvoice(id): void {
    this.router.navigate(['invoice', id]);
  }
}
