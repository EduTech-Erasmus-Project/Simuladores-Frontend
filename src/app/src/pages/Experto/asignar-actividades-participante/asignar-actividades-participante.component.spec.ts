import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarActividadesParticipanteComponent } from './asignar-actividades-participante.component';

describe('AsignarActividadesParticipanteComponent', () => {
  let component: AsignarActividadesParticipanteComponent;
  let fixture: ComponentFixture<AsignarActividadesParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarActividadesParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarActividadesParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
