import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {CrudService} from '../service/crud.service';
import {Route, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

export class Issue {
  issueTitle: string;
  issueDetails: string;
  solution: string;

}
@Pipe({name: 'safeHtml'})
export class SafeHtmlPipeline implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  issueHasBeenAdded: string;
  constructor(private service: CrudService, private route: Router) {
  }

  issue: Issue;
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

//KOLKOV!!!!!!!!!!!!!!!!!!!!
  ngOnInit() {
    this.issue = new Issue();
  }

  addNewIssue(): void {
    console.log(this.issue.issueDetails);
    this.service.addIssue(this.issue).subscribe( () => this.issueHasBeenAdded = 'Issue has been added');
  }

  goToMyIssues(): void {
    this.route.navigate(['allIssues']);
  }
}
