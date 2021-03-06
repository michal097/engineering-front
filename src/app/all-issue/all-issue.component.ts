import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Issue} from '../issue/issue.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-issue',
  templateUrl: './all-issue.component.html',
  styleUrls: ['./all-issue.component.scss']
})
export class AllIssueComponent implements OnInit {

  constructor(private service: CrudService, private router: Router) {
  }

  issue: Issue[];

  ngOnInit() {
    this.listAllIssues();
  }


  listAllIssues(): void {
    this.service.getAllIssues().subscribe(data => {
      this.issue = data;
      console.log(data);
    });
  }

  redirectToIssue(id): void {
    this.router.navigate([`issue`, `${id}`]);
  }

}
