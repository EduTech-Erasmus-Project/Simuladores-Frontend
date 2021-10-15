import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEComponent } from './inicio-e.component';

describe('InicioEComponent', () => {
  let component: InicioEComponent;
  let fixture: ComponentFixture<InicioEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
