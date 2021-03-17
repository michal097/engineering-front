import {Component, OnInit} from '@angular/core';
import {CrudService} from "../service/crud.service";
import {Router} from "@angular/router";
import {Project} from "../project/project.component";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(private service: CrudService, private router: Router) {
  }

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  projects: Project [];

  ngOnInit() {
    this.getProjesLength();
    this.service.displayProjectsList(0, this.pageSize).subscribe(data => {
      this.projects = data;
    });
  }

  getProjesLength(): void {
    // tslint:disable-next-line:radix
    this.service.allProjsLen().subscribe(data => this.length = parseInt(data));
  }

  getProjects(e): any {
    this.service.displayProjectsList(e.pageIndex, e.pageSize).subscribe(data => this.projects = data);
  }

  retrieveProjectData(projectName): void {
    const project = projectName.replaceAll(' ', '-');
    this.router.navigate(['project', `${project}`]);
  }
}
