import {Component, OnInit} from '@angular/core';
import {CrudService} from '../service/crud.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {COMMA, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ActivatedRoute, Router} from "@angular/router";

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

  createNewUser(): void {
    this.emp.skills = this.makeSkillsArr();
    this.service.saveEmployee(this.emp).subscribe(
      () => this.success(),
      () => this.errors());
  }

  success() {
    this.userGeneratedMessage = 'New employee has beed added';
    this.err = '';
  }

  errors() {
    this.err = 'Error occured during assing new user!';
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

  ngOnInit() {
    this.emp = new Employee();
  }
}
