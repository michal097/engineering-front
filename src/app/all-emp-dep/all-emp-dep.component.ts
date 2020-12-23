import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import {Employee} from '../generate-employee/generate-employee.component';

@Component({
  selector: 'app-all-emp-dep',
  templateUrl: './all-emp-dep.component.html',
  styleUrls: ['./all-emp-dep.component.scss']
})
export class AllEmpDepComponent implements OnInit {
  effect = '';
  deleteInform = '';
  employees: Employee[];
  employee: Employee;
  employeeId: number;
  sortOrder = 'asc';
  phrase = undefined;
  phraseForSort = undefined;

  // sort properties
  sortEmployeeName = 'employeename';
  sortEmployeeLName = 'employeelastName';
  sortDepartmentName = 'departmentname';
  sortDepartmentBug = 'departmentbudget';
  sortDepartmentManager = 'departmentmanager';

  constructor(private router: Router,
              private service: CrudService) {
  }

  ngOnInit() {
    this.service.testAuth();
    this.getEmps();
    this.getUsername();
  }

  getUsername(): void {
    this.service.authUsername().subscribe(
      responde => console.log(responde)
    );
  }

  getEmps(): void {
    this.service.retrieveAllEmployees().subscribe(
      response => {
        this.employees = response;
        console.log(response);
      }
    );
  }

  sortEmps(sort, sortOrder): void {
    this.service.retrieveAllEmployeesWithSort(sort, sortOrder, this.phraseForSort).subscribe(
      data => {
        this.employees = data;
      });
    if (this.sortOrder === 'asc') {
      this.sortOrder = 'desc';
    } else {
      this.sortOrder = 'asc';
    }
  }

  updateEmployee(id): void {
    this.router.navigate(['updateEmpl', `${id}`]);
  }

  deleteEmpDep(id): void {
    this.service.deleteEmployee(id).subscribe(
      () => this.deleteInfo(id)
    );
  }

  deleteInfo(id) {
    this.deleteInform = 'Relation with id: ' + id + ' has been deleted successfully!';
    this.getEmps();
  }

  retrieveDetailsOfOneUser(id): void {
    this.router.navigate(['employeeRelations', `${id}`]);
  }

  makeSearch(phrase): void {
    this.service.search(phrase).subscribe(
      data => this.employees = data
    );
    this.phraseForSort = this.phrase;
    this.phrase = undefined;
   }
}
