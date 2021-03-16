import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PayInvoiceComponent} from "../pay-invoice.component";
import {CrudService} from "../../service/crud.service";

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

  ngOnInit() {

  }

  makePayment(): void {
    this.service.makePayment(this.data).subscribe();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
