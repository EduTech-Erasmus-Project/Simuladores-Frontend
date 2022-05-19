import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionInicioUserComponent } from './presentacion-inicio-user.component';

describe('PresentacionInicioUserComponent', () => {
  let component: PresentacionInicioUserComponent;
  let fixture: ComponentFixture<PresentacionInicioUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentacionInicioUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionInicioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
