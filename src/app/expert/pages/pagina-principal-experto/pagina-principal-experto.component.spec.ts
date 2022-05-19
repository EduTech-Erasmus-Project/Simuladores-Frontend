import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipalExpertoComponent } from './pagina-principal-experto.component';

describe('PaginaPrincipalExpertoComponent', () => {
  let component: PaginaPrincipalExpertoComponent;
  let fixture: ComponentFixture<PaginaPrincipalExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPrincipalExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPrincipalExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
