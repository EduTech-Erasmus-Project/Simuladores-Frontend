import { TestBed } from '@angular/core/testing';

import { ConsultasParaGraficasService } from './consultas-para-graficas.service';

describe('ConsultasParaGraficasService', () => {
  let service: ConsultasParaGraficasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasParaGraficasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
