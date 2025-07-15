import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5TestComponent } from './p5-test.component';

describe('P5TestComponent', () => {
  let component: P5TestComponent;
  let fixture: ComponentFixture<P5TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P5TestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P5TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
