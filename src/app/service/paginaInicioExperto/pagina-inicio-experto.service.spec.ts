import { TestBed } from '@angular/core/testing';

import { PaginaInicioExpertoService } from './pagina-inicio-experto.service';

describe('PaginaInicioExpertoService', () => {
  let service: PaginaInicioExpertoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaInicioExpertoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
