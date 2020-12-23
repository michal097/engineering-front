import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeptComponent } from './employee-dept.component';

describe('EmployeeDeptComponent', () => {
  let component: EmployeeDeptComponent;
  let fixture: ComponentFixture<EmployeeDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
