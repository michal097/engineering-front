import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateEmployeeComponent } from './generate-employee.component';

describe('GenerateEmployeeComponent', () => {
  let component: GenerateEmployeeComponent;
  let fixture: ComponentFixture<GenerateEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
