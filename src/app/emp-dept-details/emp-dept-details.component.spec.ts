import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDeptDetailsComponent } from './emp-dept-details.component';

describe('EmpDeptDetailsComponent', () => {
  let component: EmpDeptDetailsComponent;
  let fixture: ComponentFixture<EmpDeptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpDeptDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDeptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
