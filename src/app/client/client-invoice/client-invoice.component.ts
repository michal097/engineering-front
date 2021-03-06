import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CrudService} from '../../service/crud.service';

@Component({
  selector: 'app-client-invoice',
  templateUrl: './client-invoice.component.html',
  styleUrls: ['./client-invoice.component.scss']
})
export class ClientInvoiceComponent implements OnInit {

  invoiceURL: string;

  constructor(public dialogRef: MatDialogRef<ClientInvoiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: CrudService) {
  }

  ngOnInit() {
    this.service.findInvoiceByNumber(this.changeStringToAcceptableInURL(this.data)).subscribe(d => this.invoiceURL = d);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeStringToAcceptableInURL(url): any {
    const search = '/';
    const replateWith = '_';
    return url.split(search).join(replateWith);
  }
}
