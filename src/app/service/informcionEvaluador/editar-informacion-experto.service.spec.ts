import { TestBed } from '@angular/core/testing';

import { EditarInformacionExpertoService } from './editar-informacion-experto.service';

describe('EditarInformacionExpertoService', () => {
  let service: EditarInformacionExpertoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarInformacionExpertoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
