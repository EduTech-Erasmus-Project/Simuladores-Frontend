import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteInfoComponent } from './participante-info.component';

describe('ParticipanteInfoComponent', () => {
  let component: ParticipanteInfoComponent;
  let fixture: ComponentFixture<ParticipanteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipanteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
