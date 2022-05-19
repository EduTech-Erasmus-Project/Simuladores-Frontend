import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFooterPageComponent } from './menu-footer-page.component';

describe('MenuFooterPageComponent', () => {
  let component: MenuFooterPageComponent;
  let fixture: ComponentFixture<MenuFooterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFooterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFooterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
