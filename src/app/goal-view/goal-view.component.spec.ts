import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalViewComponent } from './goal-view.component';

describe('GoalViewComponent', () => {
  let component: GoalViewComponent;
  let fixture: ComponentFixture<GoalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
