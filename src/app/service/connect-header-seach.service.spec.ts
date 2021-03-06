import { TestBed } from '@angular/core/testing';

import { ConnectHeaderSeachService } from './connect-header-seach.service';

describe('ConnectHeaderSeachService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectHeaderSeachService = TestBed.get(ConnectHeaderSeachService);
    expect(service).toBeTruthy();
  });
});
