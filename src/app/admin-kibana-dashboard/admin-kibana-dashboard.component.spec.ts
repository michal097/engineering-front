import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKibanaDashboardComponent } from './admin-kibana-dashboard.component';

describe('AdminKibanaDashboardComponent', () => {
  let component: AdminKibanaDashboardComponent;
  let fixture: ComponentFixture<AdminKibanaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKibanaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKibanaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
