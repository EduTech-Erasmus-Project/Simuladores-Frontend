import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisActividadesUsuarioComponent } from './mis-actividades-usuario.component';

describe('MisActividadesUsuarioComponent', () => {
  let component: MisActividadesUsuarioComponent;
  let fixture: ComponentFixture<MisActividadesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisActividadesUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisActividadesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
