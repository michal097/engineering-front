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
  displayCountPage = 0;
  // sort properties
  sortEmployeeName = 'employeename';
  sortEmployeeLName = 'employeelastName';
  sortDepartmentName = 'departmentname';
  sortDepartmentBug = 'departmentbudget';
  sortDepartmentManager = 'departmentmanager';
  searchValidation = '';
  // records property
  records = 5;

  constructor(private router: Router,
              private service: CrudService) {
  }

  ngOnInit() {
    this.service.testAuth();
    this.getEmps();
    this.countAllRecords();
    this.getUsername();
  }

  changeRecords(records): void {
    this.records = records;
  }

  getUsername(): void {
    this.service.authUsername().subscribe(
      responde => console.log(responde)
    );
  }

  getEmps(): void {
    this.service.retrieveAllEmployees(this.page, this.records).subscribe(
      response => {
        this.employees = response;
      }
    );
  }

  sortEmps(sort, sortOrder): void {
    this.service.retrieveAllEmployeesWithSort(sort, sortOrder, this.phraseForSort, this.page, this.records).subscribe(
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
    if (phrase === '' || phrase === undefined) {
      phrase = undefined;
      this.searchValidation = 'Enter some text';
    } else {
      this.searchValidation = '';
    }
    this.service.search(phrase, this.page, this.records).subscribe(
      data => this.employees = data
    );
    this.countAllRecords();
    this.phraseForSort = this.phrase;
  }

  makePageZero(): void {
    this.page = 0;
  }

  countAllRecords(): void {
    if (this.phrase === '') {
      this.phrase = '_';
    }
    this.service.countPages(this.phrase).subscribe(data => {
      this.countPages = Number(data);
      this.displayCountPage = Math.ceil(Number(data) / this.records);
      if (this.countPages === 0) {
        this.displayCountPage = Number(data) + 1;
      }
      this.phrase = '';
    });

  }

  increment(): void {
    if (this.countPages - (this.records * (this.page + 1)) > 0) {
      this.page++;
      this.makeSearch(this.phrase);
      this.searchValidation = '';
    }
  }

  decrement(): void {
    if (this.page > 0) {
      this.page--;
      this.makeSearch(this.phrase);
      this.searchValidation = '';
    }
  }
}
