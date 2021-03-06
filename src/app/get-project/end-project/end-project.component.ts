import {Component, Inject, OnInit} from '@angular/core';
import {Client} from "../../client/client.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CrudService} from "../../service/crud.service";
import {Router} from "@angular/router";
import {Project} from "../../project/project.component";

@Component({
  selector: 'app-end-project',
  templateUrl: './end-project.component.html',
  styleUrls: ['./end-project.component.scss']
})
export class EndProjectComponent implements OnInit {

  project: Project;

  ngOnInit() {
    this.project = this.data;
  }

  constructor(
    public dialogRef: MatDialogRef<EndProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private service: CrudService,
    private router: Router) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  endProjectNow(projectName): void {
    this.service.endProject(projectName, this.project).subscribe(data => console.log(data));
    this.dialogRef.close();
  }

}
