import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';

export class Employee {
  constructor(public name: string,
              public username: string,
              public lastName: string,
              public age: number,
              public salary: number,
              public department: string,
              public empDeptId: number,
              public empName: string) {

  }
}

@Component({
  selector: 'app-generate-employee',
  templateUrl: './generate-employee.component.html',
  styleUrls: ['./generate-employee.component.scss']
})
export class GenerateEmployeeComponent implements OnInit {

  emp: Employee;
  createdMessage: string;
  mess: string;
  depNames = [];

  invName: string;
  invUsername: string;
  invLastName: string;
  invAge: string;
  invSalary: string;
  invDepart: string;

  constructor(private service: CrudService) {
  }

  ngOnInit() {
    this.emp = new Employee(null, null, null, null, null, null, null, null);
    this.getDepNames();

  }

  saveEmp(): void {
    console.log(this.emp);
    this.service.createEmp(this.emp).subscribe(
      () => this.fushData(),
      () => this.validateEmp(this.emp)
    );
  }


  getDepNames(): void {
    this.service.getDepartNames().subscribe(
      response => this.depNames = response
    );
  }

  save(): void {
    this.saveEmp();

  }

  fushData(): void {
    this.createdMessage = 'Employee has been created!';
    this.emp = new Employee(null, null, null, null, null, null, null, null);

  }

  validateEmp(emp) {
    if (emp.username === '' || emp.username === null) {
      this.invUsername = 'Invalid username';
    } else {
      this.invUsername = '';
    }
    if (emp.name === '' || emp.name === null) {
      this.invName = 'invalid name';
    } else {
      this.invName = '';
    }
    if (emp.age < 18) {
      this.invAge = 'Wrong age (18 minimum)';
    } else {
      this.invAge = '';
    }
    if (emp.lastName === '' || emp.lastName === null) {
      this.invLastName = 'invalid last name';
    } else {
      this.invLastName = '';
    }
    if (emp.salary < 3000 || emp.salary === null) {
      this.invSalary = 'indalid salary (min 3000)';

    } else {
      this.invSalary = '';
    }
    this.createdMessage = '';
  }
}
