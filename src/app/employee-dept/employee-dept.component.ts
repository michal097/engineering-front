import {Component, OnInit} from '@angular/core';
import {Department} from '../generate-department/generate-department.component';
import {CrudService} from '../service/crud.service';

@Component({
  selector: 'app-employee-dept',
  templateUrl: './employee-dept.component.html',
  styleUrls: ['./employee-dept.component.scss']
})
export class EmployeeDeptComponent implements OnInit {
  department: Department[];

  constructor(private service: CrudService) {
  }

  ngOnInit() {
    this.getMyDept();
  }

  getMyDept() {
    this.service.retrieveMyDepartment().subscribe(
      data => this.department = data
    );
  }

}
