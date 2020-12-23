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
  page = 0;
  countPages = 0;

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
    this.countAllRecords();
    this.getUsername();
  }

  getUsername(): void {
    this.service.authUsername().subscribe(
      responde => console.log(responde)
    );
  }

  getEmps(): void {
    this.service.retrieveAllEmployees(this.page).subscribe(
      response => {
        this.employees = response;
        console.log(response);
      }
    );
  }

  sortEmps(sort, sortOrder): void {
    this.service.retrieveAllEmployeesWithSort(sort, sortOrder, this.phraseForSort, this.page).subscribe(
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
    this.service.search(phrase, this.page).subscribe(
      data => this.employees = data
    );
    this.phraseForSort = this.phrase;
    this.phrase = undefined;
  }

  countAllRecords(): void {
    this.service.countPages().subscribe(data => this.countPages = Number(data));
  }

  increment(): void {
    if (this.countPages - (5 * (this.page + 1)) > 0) {
      console.log('rekordy: ' + this.countPages);
      console.log('strona' + this.page);
      this.page++;
      this.getEmps();
    }
    console.log(this.page);
  }

  decrement(): void {
    if (this.page > 0) {
      this.page--;
      this.getEmps();
    }
  }
}
