import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NPuzzleComponent } from './npuzzle.component';

describe('NPuzzleComponent', () => {
  let component: NPuzzleComponent;
  let fixture: ComponentFixture<NPuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NPuzzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
