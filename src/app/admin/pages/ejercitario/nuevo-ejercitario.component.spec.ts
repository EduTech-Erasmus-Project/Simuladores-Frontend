import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEjercitarioComponent } from './nuevo-ejercitario.component';

describe('NuevoEjercitarioComponent', () => {
  let component: NuevoEjercitarioComponent;
  let fixture: ComponentFixture<NuevoEjercitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEjercitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEjercitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
