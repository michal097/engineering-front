import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../client.component';
import {CrudService} from "../../service/crud.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {

  client: Client;

  ngOnInit() {
    this.client = this.data;
  }

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private service: CrudService,
    private router: Router) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateClient(clientId, clientObj): void {
    this.service.updateClientData(clientId, clientObj).subscribe();
  }

}
