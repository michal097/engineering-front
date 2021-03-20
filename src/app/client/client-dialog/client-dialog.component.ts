import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../client.component';
import {CrudService} from '../../service/crud.service';
import {Router} from '@angular/router';

export class Emp {
  name: string;
  surname: string;
  adress: string;
  email: string;
}

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {

  client: Emp;
  validateMessage: string;
  isValid = true;

  ngOnInit() {
    this.client = this.data;
  }

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Emp,
    private service: CrudService,
    private router: Router) {
  }

  validateEmail(email): any {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkClientValid(): void {
    const validArray = [];
    if (this.client.name === '' || this.client.name === undefined) {
      validArray.push('name');
      this.isValid = false;
    }
    if (this.client.surname === '' || this.client.surname === undefined) {
      validArray.push('surname');
      this.isValid = false;
    }
    if (this.client.adress === '' || this.client.adress === undefined) {
      validArray.push('adress');
      this.isValid = false;
    }
    if (!this.validateEmail(this.client.email)) {
      validArray.push('email');
      this.isValid = false;
    }

    this.validateMessage = 'Errors occured on following fields: ' + validArray.join(', ');

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateClient(clientId, clientObj): void {
    this.isValid = true;
    this.checkClientValid();
    if (this.isValid) {
      this.service.updateClientData(clientId, clientObj).subscribe();
      this.dialogRef.close();
    } else {
    }
  }

}
