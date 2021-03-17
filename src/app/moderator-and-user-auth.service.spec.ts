import { TestBed } from '@angular/core/testing';

import { ModeratorAndUserAuthService } from './moderator-and-user-auth.service';

describe('ModeratorAndUserAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeratorAndUserAuthService = TestBed.get(ModeratorAndUserAuthService);
    expect(service).toBeTruthy();
  });
});
