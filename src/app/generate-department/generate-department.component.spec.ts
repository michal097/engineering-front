import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDepartmentComponent } from './generate-department.component';

describe('GenerateDepartmentComponent', () => {
  let component: GenerateDepartmentComponent;
  let fixture: ComponentFixture<GenerateDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
