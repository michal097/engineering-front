import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {ActivatedRoute} from '@angular/router';
import {Issue} from '../issue/issue.component';
import {DomSanitizer} from '@angular/platform-browser';
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {
  }

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

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    sanitize: false,
    minHeight: '300px',
    maxHeight: '300px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'times-new-roman', name: 'Times New Roman'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    //  upload: (file: File) => {},
    uploadWithCredentials: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(private service: CrudService, private router: ActivatedRoute) {
  }

  actualUser: string;

  ngOnInit() {
    this.issueId = this.router.snapshot.params.id;
    this.retrieveIssueData();
    this.service.getActualUser().subscribe(data => this.actualUser = data);
  }

  retrieveIssueData(): void {
    this.service.getSpecIssue(this.issueId).subscribe(data => this.issue = data);

  }

  saveIssueSolution(): void {
    this.service.saveIssueSolution(this.issue).subscribe(data => this.issue = data);
  }

  makeWorkInPro(): void {
    this.service.makeWorkInProgress(this.issue).subscribe(data => this.issue = data);
  }

  getInnerHTMLData(): any {
    return this.issue.issueDetails;
  }
}
