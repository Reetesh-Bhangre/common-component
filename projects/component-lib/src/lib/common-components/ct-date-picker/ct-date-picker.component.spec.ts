import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtDatePickerComponent } from './ct-date-picker.component';

describe('CtDatePickerComponent', () => {
  let component: CtDatePickerComponent;
  let fixture: ComponentFixture<CtDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtDatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
