import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterExpertoComponent } from './register-experto.component';

describe('RegisterExpertoComponent', () => {
  let component: RegisterExpertoComponent;
  let fixture: ComponentFixture<RegisterExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
