import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIssueComponent } from './get-issue.component';

describe('GetIssueComponent', () => {
  let component: GetIssueComponent;
  let fixture: ComponentFixture<GetIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
