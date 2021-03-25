import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PayInvoiceComponent} from '../pay-invoice.component';
import {CrudService} from '../../service/crud.service';
import {Invoice} from '../../invoice/invoice.component';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PayInvoiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: CrudService) {
  }

  result: string;
  invoice: Invoice;
  name: string;
  startMakingPayout = false;
  error: boolean;

  ngOnInit() {
    this.invoice = this.data;
    this.name = this.invoice.invName + '_' + this.invoice.invSurname;
    console.log(this.name);
  }

  makePayment(): void {
    this.startMakingPayout = true;
    this.service.makePayment(this.invoice.costs,
      this.name,
      this.invoice.bankAccNumber,
      this.invoice.invoiceId).subscribe(
        d => {
      if (d !== undefined) {
        this.dialogRef.close();
        this.startMakingPayout = false;
      }
    },
      () => {
          this.error = true;
        }
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
