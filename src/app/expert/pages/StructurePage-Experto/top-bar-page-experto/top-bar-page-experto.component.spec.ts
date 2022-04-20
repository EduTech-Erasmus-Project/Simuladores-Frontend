import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarPageExpertoComponent } from './top-bar-page-experto.component';

describe('TopBarPageExpertoComponent', () => {
  let component: TopBarPageExpertoComponent;
  let fixture: ComponentFixture<TopBarPageExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarPageExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarPageExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
