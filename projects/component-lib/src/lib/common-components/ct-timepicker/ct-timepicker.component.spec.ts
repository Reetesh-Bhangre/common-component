import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtTimepickerComponent } from './ct-timepicker.component';

describe('CtTimepickerComponent', () => {
  let component: CtTimepickerComponent;
  let fixture: ComponentFixture<CtTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtTimepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
