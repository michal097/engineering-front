import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';

export class Department {
  constructor(
    public departmentName: string,
    public bugdet: number,
    public departmentManager: string
  ) {
  }
}

@Component({
  selector: 'app-generate-department',
  templateUrl: './generate-department.component.html',
  styleUrls: ['./generate-department.component.scss']
})
export class GenerateDepartmentComponent implements OnInit {
  dep: Department;
  createdMessageDepartment: string;

  invDepName: string;
  invBudget: string;
  invDepartManager: string;

  constructor(private service: CrudService) {
  }

  ngOnInit() {
    this.dep = new Department(null, null, null);
    this.service.testAuth();
  }

  saveDep(): void {
    console.log(this.dep);
    this.service.createDepart(this.dep).subscribe(
      () => this.flushAddDepart(),
      () => this.validateDep(this.dep)
    );
  }

  flushAddDepart(): void {
    this.dep = new Department(null, null, null);
    this.createdMessageDepartment = 'department has been created!';
  }

  validateDep(dep) {
    if (dep.departmentName === '' || dep.departmentName === null) {
      this.invDepName = 'Invalid department name';
    } else {
      this.invDepName = '';
    }
    if (dep.departmentManager === '' || dep.departmentManager === null) {
      this.invDepartManager = 'fill depart manager';
    } else {
      this.invDepartManager = '';
    }
    if (dep.bugdet < 3000 ) {
      this.invBudget = 'Wrong budget';
    } else {
      this.invBudget = '';
    }
    this.createdMessageDepartment = '';
  }
}
