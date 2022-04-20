import { TestBed } from '@angular/core/testing';

import { AutentificarGuard } from './autentificar.guard';

describe('AutentificarGuard', () => {
  let guard: AutentificarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutentificarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
