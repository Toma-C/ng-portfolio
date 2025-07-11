import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCComponent } from './grid-c.component';

describe('GridCComponent', () => {
  let component: GridCComponent;
  let fixture: ComponentFixture<GridCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
