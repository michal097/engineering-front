import {Component, OnInit} from '@angular/core';
import {Employee} from '../generate-employee/generate-employee.component';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../service/crud.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  employee: Employee;
  empId: number;
  updateInfo: string;
  possibleDepts: [];

  invName: string;
  invUsername: string;
  invLastName: string;
  invAge: string;
  invSalary: string;
  invDepart: string;

  constructor(private service: CrudService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.employee = new Employee(null, null, null, null, null, null, null, null);
    this.empId = this.router.snapshot.params.id;
    this.retrieveEmp(this.empId);
    this.findPossibleDepts(this.empId);
  }

  retrieveEmp(id): void {
    this.service.getOneEmployee(id).subscribe(
      data => {
        console.log(data);
        return this.employee = (data as Employee);
      }
    );
  }

  findPossibleDepts(id): void {
    this.service.possibleDepts(id).subscribe(
      data => this.possibleDepts = data
    );
  }

  update(): void {
    this.service.updateEmpDept(this.empId, this.employee).subscribe(
      () => this.flushData(),
      () => this.validateUpdate(this.employee)
    );
  }

  flushData(): void {
    this.employee.department = '';
    this.updateInfo = 'Employee has been updated!';
    this.findPossibleDepts(this.empId);

  }

  validateUpdate(employee) {

    if (employee.name === '' || employee.name === null) {
      this.invName = 'invalid name';
    } else {
      this.invName = '';
    }
    if (employee.age < 18) {
      this.invAge = 'Wrong age (18 minimum)';
    } else {
      this.invAge = '';
    }
    if (employee.lastName === '' || employee.lastName === null) {
      this.invLastName = 'invalid last name';
    } else {
      this.invLastName = '';
    }
    if (employee.salary < 3000 || employee.salary === null) {
      this.invSalary = 'indalid salary (min 3000)';

    } else {
      this.invSalary = '';
    }
    this.updateInfo = '';
  }
}
