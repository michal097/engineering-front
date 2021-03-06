import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {CrudService} from "../service/crud.service";

export class Issue {
  issueTitle: string;
  issueDetails: string;

}

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  constructor(private service: CrudService) {
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
    this.service.addIssue(this.issue).subscribe();
  }
}
