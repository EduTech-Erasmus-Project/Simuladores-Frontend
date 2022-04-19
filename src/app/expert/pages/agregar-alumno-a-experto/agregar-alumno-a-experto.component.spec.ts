import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlumnoAExpertoComponent } from './agregar-alumno-a-experto.component';

describe('AgregarAlumanoAExpertoComponent', () => {
  let component: AgregarAlumnoAExpertoComponent;
  let fixture: ComponentFixture<AgregarAlumnoAExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAlumnoAExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlumnoAExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
