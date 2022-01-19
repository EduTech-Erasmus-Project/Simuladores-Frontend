import { TestBed } from '@angular/core/testing';

import { InformacionEvaluadorService } from './informacion-evaluador.service';

describe('InformacionEvaluadorService', () => {
  let service: InformacionEvaluadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionEvaluadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
