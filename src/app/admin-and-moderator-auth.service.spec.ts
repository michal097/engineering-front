import { TestBed } from '@angular/core/testing';

import { AdminAndModeratorAuthService } from './admin-and-moderator-auth.service';

describe('AdminAndUserAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAndModeratorAuthService = TestBed.get(AdminAndModeratorAuthService);
    expect(service).toBeTruthy();
  });
});
