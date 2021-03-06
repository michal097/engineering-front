import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Client} from '../client/client.component';

export class Invoice {
  fvNumber: string;
  bankAccNumber: string;
  invName: string;
  invSurname: string;
  NIP: string;

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
