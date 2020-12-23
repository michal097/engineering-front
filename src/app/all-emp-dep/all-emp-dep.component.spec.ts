import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmpDepComponent } from './all-emp-dep.component';

describe('AllEmpDepComponent', () => {
  let component: AllEmpDepComponent;
  let fixture: ComponentFixture<AllEmpDepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmpDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmpDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
