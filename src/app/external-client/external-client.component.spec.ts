import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalClientComponent } from './external-client.component';

describe('ExternalClientComponent', () => {
  let component: ExternalClientComponent;
  let fixture: ComponentFixture<ExternalClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
