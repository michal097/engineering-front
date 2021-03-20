import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Issue} from '../issue/issue.component';
import {Router} from '@angular/router';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-all-issue',
  templateUrl: './all-issue.component.html',
  styleUrls: ['./all-issue.component.scss']
})
export class AllIssueComponent implements OnInit {

  constructor(private service: CrudService, private router: Router) {
  }

  issue: Issue[];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  issuesLen: number;

  ngOnInit() {
    this.service.getAllIssues(0, this.pageSize).subscribe(data => this.issue = data);
    // tslint:disable-next-line:radix
    this.service.getAllissuesLen().subscribe(data => this.issuesLen = parseInt(data));
  }


  listAllIssues(e): void {
    this.service.getAllIssues(e.pageIndex, e.pageSize).subscribe(data => {
      this.issue = data;
      console.log(data);
    });
  }

  redirectToIssue(id): void {
    this.router.navigate([`issue`, `${id}`]);
  }

}
