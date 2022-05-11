import { TestBed } from '@angular/core/testing';

import { AutentificacionUsuarioService } from './autentificacion-usuario.service';

describe('AutentificacionUsuarioService', () => {
  let service: AutentificacionUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentificacionUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
