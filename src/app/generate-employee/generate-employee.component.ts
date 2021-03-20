import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {COMMA, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Router} from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


export interface Skills {
  name: string;
}

export class Employee {
  name: string;
  surname: string;
  email: string;
  adress: string;
  nip: string;
  skills: string[];
  userType: string;

  constructor() {
  }
}

@Component({
  selector: 'app-generate-employee',
  templateUrl: './generate-employee.component.html',
  styleUrls: ['./generate-employee.component.scss']
})


export class GenerateEmployeeComponent implements OnInit {


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private service: CrudService, private route: Router) {
  }

  emp: Employee;
  selectable = true;
  removable = true;
  addOnBlur = true;
  skills: string[] = [];
  readonly separatorKeysCodes: number[] = [SPACE, COMMA];
  fruits: Skills[] = [];
  userGeneratedMessage = '';
  err = '';
  validationInfo: string;
  actUser: string;
  isValid = true;
  errNIP: string;

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

  makeSkillsArr(): string[] {
    this.skills = [];
    for (let i = 0; i < this.fruits.length; i++) {
      this.skills.push(this.fruits[i].name);
    }

    return this.skills;
  }

  validateEmail(email): any {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateData(): void {
    this.isValid = true;
    const errorArray = [];
    this.validationInfo = 'Errors occured in following fields: ';
    if (this.emp.name === '' || this.emp.name === undefined) {
      errorArray.push('name');
      this.isValid = false;
    }
    if (this.emp.surname === '' || this.emp.surname === undefined) {
      errorArray.push('surname');
      this.isValid = false;
    }

    if (!this.validateEmail(this.emp.email)) {
      errorArray.push('email');
      this.isValid = false;
    }

    if (this.emp.adress === '' || this.emp.adress === undefined) {
      errorArray.push('adress');
      this.isValid = false;
    }

    if (this.emp.nip === '' || this.emp.nip === undefined || this.emp.nip.length !== 10) {
      errorArray.push('NIP');
      this.isValid = false;
    }

    const arrayInfo = errorArray.join(' ,');
    this.validationInfo += arrayInfo;
  }


  createNewUser(): void {
    this.validateData();
    if (this.isValid) {
      this.emp.skills = this.makeSkillsArr();
      this.service.saveEmployee(this.emp).subscribe(
        () => this.success(),
        () => this.errors());
    } else {
      this.err = this.validationInfo;
    }

  }

  success() {
    this.userGeneratedMessage = 'New employee has beed added';
    this.err = '';
    this.errNIP = '';
  }

  errors() {
    this.errNIP = 'User with following NIP already exists in database';
    this.userGeneratedMessage = '';
  }

  remove(fruit: Skills): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  goToAllEmps(): void {
    this.route.navigate(['allClients']);
  }

  checkUser(): void {
    this.service.getActualUser().subscribe(data => this.actUser = data);
  }

  ngOnInit() {
    this.emp = new Employee();
    this.checkUser();
  }
}
