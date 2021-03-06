import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {ActivatedRoute} from '@angular/router';
import {Issue} from '../issue/issue.component';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-get-issue',
  templateUrl: './get-issue.component.html',
  styleUrls: ['./get-issue.component.scss']
})
export class GetIssueComponent implements OnInit {

  issue: Issue;
  issueId: string;

  constructor(private service: CrudService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.issueId = this.router.snapshot.params.id;
    this.retrieveIssueData();
  }

  retrieveIssueData(): void {
    this.service.getSpecIssue(this.issueId).subscribe(data => this.issue = data);

  }

  getInnerHTMLData(): any {
    console.log(this.issue.issueDetails);
    return this.issue.issueDetails;
  }
}
