import { TestBed } from '@angular/core/testing';

import { AdminAndUserAuthService } from './admin-and-moderator-auth.service';

describe('AdminAndUserAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAndUserAuthService = TestBed.get(AdminAndUserAuthService);
    expect(service).toBeTruthy();
  });
});
