import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFooterPageExpertoComponent } from './menu-footer-page-experto.component';

describe('MenuFooterPageExpertoComponent', () => {
  let component: MenuFooterPageExpertoComponent;
  let fixture: ComponentFixture<MenuFooterPageExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFooterPageExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFooterPageExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
