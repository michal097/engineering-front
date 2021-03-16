import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Issue} from '../issue/issue.component';
import {Project} from '../project/project.component';
import {Invoice} from '../invoice/invoice.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-archival-data',
  templateUrl: './archival-data.component.html',
  styleUrls: ['./archival-data.component.scss']
})
export class ArchivalDataComponent implements OnInit {

  projects: Project[];
  issues: Issue[];
  invoices: Invoice[];

  constructor(private service: CrudService, private router: Router) {
  }

  ngOnInit() {
    this.archInvoice();
    this.archIssue();
    this.archProject();
  }

  archInvoice(): void {
    this.service.archivalInvoices().subscribe(data => this.invoices = data);
  }

  archIssue(): void {
    this.service.archivalIssue().subscribe(data => this.issues = data);
  }

  archProject(): void {
    this.service.archivalProjects().subscribe(data => this.projects = data);
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
