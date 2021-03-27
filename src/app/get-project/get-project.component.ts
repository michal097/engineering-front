import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import {Project} from '../project/project.component';
import {MatDialog} from '@angular/material/dialog';
import {EndProjectComponent} from './end-project/end-project.component';
import {AssignEmpComponent} from './assign-emp/assign-emp.component';

@Component({
  selector: 'app-get-project',
  templateUrl: './get-project.component.html',
  styleUrls: ['./get-project.component.scss']
})
export class GetProjectComponent implements OnInit {
  projectNameSnap: string;
  project: Project;

  constructor(private service: CrudService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EndProjectComponent, {
      width: '500px',
      data: this.project.projectName
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProjectData();
    });
  }

  assignEmployee(): void {
    const dialogRef = this.dialog.open(AssignEmpComponent, {
      width: '700px',
      data: this.project
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProjectData();
    });
  }


  ngOnInit() {
    this.prepareProjectName(this.route.snapshot.params.projectName);
    this.getProjectData();
  }

  prepareProjectName(projectName: string): any {
    return this.projectNameSnap = projectName.replace(' ', '-');
  }

  getProjectData(): void {
    this.service.getSpecProject(this.projectNameSnap).subscribe(data => {
      this.project = data;
      console.log(data);
    });
  }

  retrieveUserData(id): void {
    this.router.navigate(['emplyeeDetails', `${id}`]);
  }

  deleteEmpFromPro(client): void {
    this.service.deleteEmployeeFromProject(this.project.projectName, client).subscribe(() => this.getProjectData());
  }

}
