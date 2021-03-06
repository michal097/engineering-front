import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../project/project.component';
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogComponent} from './client-dialog/client-dialog.component';
import {DeleteClientDialogComponent} from './delete-client-dialog/delete-client-dialog.component';
import {Invoice, InvoiceComponent} from '../invoice/invoice.component';
import {ClientInvoiceComponent} from './client-invoice/client-invoice.component';

export class Client {
  constructor(s: string) {
    this.username = s;
  }

  invName: string;
  invSurname: string;
  nip: string;
  costs: number;
  fvNumber: string;
  bankAccNumber: string;
  username: string;
  clientId: string;


  Client(name: string, surname: string, NIP: string, cost: number, fvNumber: string, bankAccNumber: string) {
    this.invName = name;
    this.invSurname = surname;
    this.nip = NIP;
    this.costs = cost;
    this.fvNumber = fvNumber;
    this.bankAccNumber = bankAccNumber;
  }
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})


export class ClientComponent implements OnInit {

  client: Client;
  invoice: Invoice[];
  clientId: string;
  projects: Project [];
  length: number;
  pageSize = 10;
  invoiceURL: string;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private service: CrudService,
              private router: ActivatedRoute,
              private route: Router,
              public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '500px',
      data: this.client
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openInvoiceDialog(fvNum): void {


    const dialogRef = this.dialog.open(ClientInvoiceComponent, {
      width: '1000px',
      height: '1200px',
      data: fvNum
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDelDialog(): void {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent, {
      width: '500px',
      data: this.client
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  ngOnInit() {
    this.clientId = this.router.snapshot.params.id;
    this.retrieveClientData(this.clientId);
    this.getProjects(this.clientId);
    this.retrieveClientInvoices();
  }

  retrieveClientInvoices(): void {
    this.service.getClientInvoices(this.clientId).subscribe(data => this.invoice = data);
  }


  getProjects(userId): void {
    this.service.retrieveProjectsForSpecyficUser(userId).subscribe(data => {
      this.projects = data;
      this.length = data.length;
    });
  }

  retrieveClientData(id): void {
    this.service.retrieveSpecyficUserData(id).subscribe(data => this.client = data);
  }

  retrieveProjectData(projectName): void {
    this.route.navigate(['project', `${projectName}`]);
  }
}

