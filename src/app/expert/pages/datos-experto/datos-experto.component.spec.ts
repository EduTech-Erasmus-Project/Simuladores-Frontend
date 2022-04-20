import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosExpertoComponent } from './datos-experto.component';

describe('DatosExpertoComponent', () => {
  let component: DatosExpertoComponent;
  let fixture: ComponentFixture<DatosExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
