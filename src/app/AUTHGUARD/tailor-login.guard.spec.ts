import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tailorLoginGuard } from './tailor-login.guard';

describe('tailorLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tailorLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
