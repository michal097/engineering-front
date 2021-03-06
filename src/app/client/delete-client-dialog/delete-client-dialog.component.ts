import {Component, Inject, OnInit} from '@angular/core';
import {Client} from "../client.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CrudService} from "../../service/crud.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.scss']
})
export class DeleteClientDialogComponent implements OnInit {

  client: Client;
  phrase: string;
  invalidPhrase: string;

  ngOnInit() {
    this.client = this.data;
    this.phrase = null;
  }

  constructor(
    public dialogRef: MatDialogRef<DeleteClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private service: CrudService,
    private router: Router) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteClient(clientId): void {
    if (this.phrase === this.client.username) {
      this.service.deleteClientById(clientId).subscribe(r => {
        this.router.navigate(['allClients']);
        this.onNoClick();
      });
    } else {
      this.invalidPhrase = 'you entered invalid phrase';
    }
  }


}
