import { TestBed } from '@angular/core/testing';

import { InfoExpertoPorEscenarioService } from './info-experto-por-escenario.service';

describe('InfoExpertoPorEscenarioService', () => {
  let service: InfoExpertoPorEscenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoExpertoPorEscenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
