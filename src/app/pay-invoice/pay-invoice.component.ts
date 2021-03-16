import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CrudService} from "../service/crud.service";
import {Invoice} from "../invoice/invoice.component";
import {ClientInvoiceComponent} from "../client/client-invoice/client-invoice.component";
import {MatDialog} from "@angular/material/dialog";
import {InvoicePreviewComponent} from "./invoice-preview/invoice-preview.component";
import {MakePaymentComponent} from "./make-payment/make-payment.component";

@Component({
  selector: 'app-pay-invoice',
  templateUrl: './pay-invoice.component.html',
  styleUrls: ['./pay-invoice.component.scss']
})
export class PayInvoiceComponent implements OnInit {

  constructor(private service: CrudService, private snap: ActivatedRoute, private dialog: MatDialog) {
  }

  fvId: string;
  inv: Invoice;

  ngOnInit() {
    this.fvId = this.snap.snapshot.params.id;
    this.retrieveInvoice(this.fvId);

  }

  retrieveInvoice(id): void {
    this.service.getInvoiceById(id).subscribe(data => {
      this.inv = data;
      console.log(data);
    });
  }

  openInvoiceDialog(): void {

    const dialogRef = this.dialog.open(InvoicePreviewComponent, {
      width: '1000px',
      height: '1200px',
      data: this.inv
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openPaymentDialog(): void {
    const dialogRef = this.dialog.open(MakePaymentComponent, {
      width: '500px',
      height: '250px',
      data: this.inv
    });
    dialogRef.afterClosed().subscribe(() => this.retrieveInvoice(this.fvId));
  }

}
