import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionInicioExpertoComponent } from './presentacion-inicio-experto.component';

describe('PresentacionInicioExpertoComponent', () => {
  let component: PresentacionInicioExpertoComponent;
  let fixture: ComponentFixture<PresentacionInicioExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentacionInicioExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionInicioExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
