import {Component, OnInit} from '@angular/core';
import {Employee} from "../generate-employee/generate-employee.component";
import {Router} from "@angular/router";
import {CrudService} from "../service/crud.service";

export class Emp {
  employeeId: number;
  name: string;
  lastName: string;
  age: number;
  eployedDate: Date;

  constructor() {
  }
}

@Component({
  selector: 'app-employee-user',
  templateUrl: './employee-user.component.html',
  styleUrls: ['./employee-user.component.scss']
})
export class EmployeeUserComponent implements OnInit {
  effect = '';
  authMess = '';
  employees: Employee[];
  employee: Emp[];

  constructor(private router: Router,
              private service: CrudService) {
  }

  ngOnInit() {
    this.getEmps();
  }

  getEmps(): void {
    this.service.retrieveDataOfSpecyficUser().subscribe(
      response => {
        this.employee = response;
        console.log(response);
      }
    );
  }
}
