import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../project/project.component';
import {CrudService} from '../../service/crud.service';
import {Client} from '../../client/client.component';

@Component({
  selector: 'app-assign-emp',
  templateUrl: './assign-emp.component.html',
  styleUrls: ['./assign-emp.component.scss']
})
export class AssignEmpComponent implements OnInit {

  project: Project;
  emp: Client[];

  constructor(
    public dialogRef: MatDialogRef<AssignEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private service: CrudService) {
  }

  ngOnInit() {
    this.project = this.data;
    this.getEmpToProj();
  }

  getEmpToProj(): void {
    console.log(this.project.projectName);
    this.service.getEmployeesToProject(this.project.projectName).subscribe(data => {
      this.emp = data;
      this.getProjectData();
    });

  }

  addEmpToProject(clientId): void {
    this.service.addEmpToSpecProj(this.project, clientId).subscribe(() => this.getEmpToProj());
  }

  getProjectData(): void {
    this.service.getSpecProject(this.project.projectName).subscribe(data => {
      this.project = data;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
