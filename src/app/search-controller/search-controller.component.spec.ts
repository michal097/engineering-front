import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchControllerComponent } from './search-controller.component';

describe('SearchControllerComponent', () => {
  let component: SearchControllerComponent;
  let fixture: ComponentFixture<SearchControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
