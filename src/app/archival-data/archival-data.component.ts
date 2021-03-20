import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Issue} from '../issue/issue.component';
import {Project} from '../project/project.component';
import {Invoice} from '../invoice/invoice.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-archival-data',
  templateUrl: './archival-data.component.html',
  styleUrls: ['./archival-data.component.scss']
})
export class ArchivalDataComponent implements OnInit {

  projects: Project[];
  issues: Issue[];
  invoices: Invoice[];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  invLen: number;
  issLen: number;
  proLen: number;

  actualUser: string;

  constructor(private service: CrudService, private router: Router) {
  }

  ngOnInit() {
    this.invLens();
    this.issLens();
    this.proLens();
    this.service.archivalInvoices(0, this.pageSize).subscribe(data => this.invoices = data);
    this.service.archivalIssue(0, this.pageSize).subscribe(data => this.issues = data);
    this.service.archivalProjects(0, this.pageSize).subscribe(data => this.projects = data);
    this.service.getActualUser().subscribe(data => this.actualUser = data);
  }

  invLens(): void {
    // tslint:disable-next-line:radix
    this.service.getInvoiceSize().subscribe(data => this.invLen = parseInt(data));
  }

  issLens(): void {
    // tslint:disable-next-line:radix
    this.service.getIssuesSize().subscribe(data => this.issLen = parseInt(data));
  }

  proLens(): void {
    // tslint:disable-next-line:radix
    this.service.getProjectSize().subscribe(data => this.proLen = parseInt(data));
  }

  archInvoice(e): void {
    this.service.archivalInvoices(e.pageIndex, e.pageSize).subscribe(data => this.invoices = data);
  }

  archIssue(e): void {
    this.service.archivalIssue(e.pageIndex, e.pageSize).subscribe(data => this.issues = data);
  }

  archProject(e): void {
    this.service.archivalProjects(e.pageIndex, e.pageSize).subscribe(data => this.projects = data);
  }

  navigatetoIssue(id): void {
    this.router.navigate(['issue', `${id}`]);
  }

  navigatetoProject(id): void {
    this.router.navigate(['project', `${id}`]);
  }

  navigatetoInvoice(id): void {
    this.router.navigate(['invoice', `${id}`]);
  }
}
