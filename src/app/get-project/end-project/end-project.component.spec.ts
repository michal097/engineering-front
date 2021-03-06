import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndProjectComponent } from './end-project.component';

describe('EndProjectComponent', () => {
  let component: EndProjectComponent;
  let fixture: ComponentFixture<EndProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
