import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, SPACE} from '@angular/cdk/keycodes';
import {Employee, Skills} from '../generate-employee/generate-employee.component';
import {CrudService} from '../service/crud.service';
import {Client} from "../client/client.component";

export class Project {
  constructor(param, param2, param3, param4, param5, param6) {
    this.projectName = param;
    this.startDate = param2;
    this.dealLineDate = param3;
    this.description = param4;
    this.technologies = param5;
    this.peopleNeeded = param6;
  }

  projectId: string;
  projectName: string;
  startDate: Date;
  dealLineDate: Date;
  description: string;
  technologies: string [];
  peopleNeeded: number;
  employeesOnProject: Client [];


  Project(projectName: string, startDate: Date, dealLineDate: Date, description: string, technologies: string [], peopleNeeded: number) {
    this.projectName = projectName; //
    this.startDate = startDate; //
    this.dealLineDate = dealLineDate; // to bedzie ustawiane przy ręcznym zakońćzeniu projektu
    this.description = description; //
    this.technologies = technologies; //
    this.peopleNeeded = peopleNeeded; //
  }

}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  isEditable = false;
  project: Project;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [SPACE, COMMA];
  fruits: Skills[] = [];
  projectSuccess: string;
  err: string;

  constructor(private service: CrudService) {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Skills): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  makeSkillsArr(): string[] {
    this.project.technologies = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.fruits.length; i++) {
      this.project.technologies.push(this.fruits[i].name);
    }

    return this.project.technologies;
  }

  ngOnInit() {
    this.project = new Project('', '', '', '', '', '');
    console.log(this.project.employeesOnProject);
  }


  convert(str): any {
    const date = new Date(str);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('-');
  }

  saveProject(): any {
    return this.service.enterNewProject(this.project).subscribe(
      () => this.success(),
      () => this.errors()
    );
  }

  success() {
    this.projectSuccess = 'New project has beed added';
    this.err = '';
  }

  errors() {
    this.err = 'Error occured during adding new project!!!';
    this.projectSuccess = '';
  }

}
