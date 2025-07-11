import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenguajesformalesComponent } from './lenguajesformales.component';

describe('LenguajesformalesComponent', () => {
  let component: LenguajesformalesComponent;
  let fixture: ComponentFixture<LenguajesformalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenguajesformalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LenguajesformalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
