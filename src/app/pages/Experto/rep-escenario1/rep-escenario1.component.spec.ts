import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepEscenario1Component } from './rep-escenario1.component';

describe('RepEscenario1Component', () => {
  let component: RepEscenario1Component;
  let fixture: ComponentFixture<RepEscenario1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepEscenario1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepEscenario1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
