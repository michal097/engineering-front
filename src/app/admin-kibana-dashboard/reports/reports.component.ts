import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CrudService} from '../../service/crud.service';
import {saveAs as importedSaveAs} from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  dateFrom: Date;
  dateTo: Date;

  invalidDate: string;
  invalidDateRange: string;

  constructor(public dialogRef: MatDialogRef<ReportsComponent>,
              private service: CrudService) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    console.log(this.dateFrom + ' ' + this.dateTo);
    this.dialogRef.close();
  }

  convert(str): any {
    const date = new Date(str);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('-');
  }

  generateInvoiceReport(): void {
    if (this.dateValidator(this.dateFrom) || this.dateValidator(this.dateTo)) {
      this.invalidDate = 'You entered invalid date format';
    } else if (!this.fromToDateValidator(this.dateFrom, this.dateTo)) {
      this.invalidDateRange = 'You entered invalid date range';
    } else {
      this.service.generateReport(this.convert(this.dateFrom), this.convert(this.dateTo)).subscribe(data => {
          importedSaveAs(data, 'invoices-report.xlsx');
          this.dialogRef.close();
        },
        () => this.invalidDate = 'You entered invalid date format');
    }
  }

  dateValidator(d): boolean {
    return d === '' && d === undefined;
  }

  fromToDateValidator(from: Date, to: Date): boolean {
    return from <= to && Number(to) <= Date.now();
  }
}
