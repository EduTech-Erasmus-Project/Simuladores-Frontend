import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralPageExpertoComponent } from './menu-lateral-page-experto.component';

describe('MenuLateralPageExpertoComponent', () => {
  let component: MenuLateralPageExpertoComponent;
  let fixture: ComponentFixture<MenuLateralPageExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLateralPageExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLateralPageExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
