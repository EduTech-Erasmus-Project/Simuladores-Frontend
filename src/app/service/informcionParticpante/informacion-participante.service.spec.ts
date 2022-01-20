import { TestBed } from '@angular/core/testing';

import { InformacionParticipanteService } from './informacion-participante.service';

describe('InformacionParticipanteService', () => {
  let service: InformacionParticipanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionParticipanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
