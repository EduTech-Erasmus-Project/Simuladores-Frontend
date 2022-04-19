import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarActividadesParticipanteComponent } from './agregar-actividades-participante.component';

describe('AgregarActividadesParticipanteComponent', () => {
  let component: AgregarActividadesParticipanteComponent;
  let fixture: ComponentFixture<AgregarActividadesParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarActividadesParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarActividadesParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
