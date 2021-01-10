import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {Employee} from '../generate-employee/generate-employee.component';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-emp-dept-details',
  templateUrl: './emp-dept-details.component.html',
  styleUrls: ['./emp-dept-details.component.scss']
})

export class EmpDeptDetailsComponent implements OnInit {
  employee: Employee;
  employeeId: number;

  constructor(private service: CrudService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.employeeId = this.router.snapshot.params.id;
    this.retrieveDetailsOfOneUser(this.employeeId);
  }

  retrieveDetailsOfOneUser(id): void {
    this.service.getOneEmployeeDept(id).subscribe(
      data => this.employee = data
    );
  }

}
