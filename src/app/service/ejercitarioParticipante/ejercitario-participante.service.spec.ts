import { TestBed } from '@angular/core/testing';

import { EjercitarioParticipanteService } from './ejercitario-participante.service';

describe('EjercitarioParticipanteService', () => {
  let service: EjercitarioParticipanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercitarioParticipanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
