import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayProposalComponent } from './holiday-proposal.component';

describe('HolidayProposalComponent', () => {
  let component: HolidayProposalComponent;
  let fixture: ComponentFixture<HolidayProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
