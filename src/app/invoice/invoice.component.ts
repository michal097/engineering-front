import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Client} from '../client/client.component';

export class Invoice {
  fvNumber: string;
  bankAccNumber: string;
  invName: string;
  invSurname: string;
  NIP: string;
  invoiceURL: string;
  costs: number;
  invoiceId: string;

  constructor() {
  }
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {


  loading = false;
  file: File = null;
  imageSource = 'https://enigeeringbucket.s3.us-east-2.amazonaws.com/';
  isImageLoaded = false;
  imageName = '';
  client: Client;
  userHasBeenCreated: boolean;
  uploadButton: string;
  hasError: boolean;
  validateInfo: string;
  passedValidation = true;

  constructor(private fileUploadService: CrudService) {
  }

  openInput() {
    document.getElementById('fileInput').click();
  }

  ngOnInit() {
    this.client = new Client('');
    this.uploadButton = 'Select File to Upload';
  }


  onChange(event) {
    this.isImageLoaded = false;
    this.imageSource = 'https://enigeeringbucket.s3.us-east-2.amazonaws.com/';
    this.file = event.target.files[0];
    this.imageName = 'Selected file: ' + this.file.name.replace(' ', '');
    this.uploadButton = this.imageName;
    this.userHasBeenCreated = false;
    this.hasError = false;
  }

  saveInv(): void {
    this.validateInvoice();
    if (this.passedValidation) {
      this.fileUploadService.saveInvClient(this.client).subscribe(
        () => {
          this.userHasBeenCreated = true;
          this.hasError = false;

        },
        () => {
          this.hasError = true;
          this.userHasBeenCreated = false;
        });
    }
  }

  validateInvoice(): void {
    this.hasError = false;
    this.validateInfo = 'Errors occured in following fields: ';
    this.passedValidation = true;
    const validateArr = [];
    if (this.client.fvNumber === '' || this.client.fvNumber === undefined) {
      this.passedValidation = false;
      validateArr.push('Invoice number');
    }
    if (this.client.invName === '' || this.client.invName === undefined) {
      this.passedValidation = false;
      validateArr.push('Name');
    }
    if (this.client.invSurname === '' || this.client.invSurname === undefined) {
      this.passedValidation = false;
      validateArr.push('Surname');
    }
    if (this.client.nip === '' || this.client.nip === undefined || this.client.nip.length !== 10) {
      this.passedValidation = false;
      validateArr.push('NIP');
    }
    if (this.client.bankAccNumber === '' || this.client.bankAccNumber === undefined || this.client.bankAccNumber.split(' ').join('').length !== 28) {
      this.passedValidation = false;
      validateArr.push('Bank account');
    }
    if (this.client.costs === undefined || this.client.costs < 0) {
      this.passedValidation = false;
      validateArr.push('costs');
    }
    this.validateInfo = validateArr.join(', ');
  }

  onUpload() {
    this.loading = true;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        this.imageSource = this.imageSource + this.file.name;
        this.isImageLoaded = true;
        this.fileUploadService.getInvoiceData().subscribe(data => {
          this.client = data;
        });
        this.loading = false;
      }
    );
  }
}
