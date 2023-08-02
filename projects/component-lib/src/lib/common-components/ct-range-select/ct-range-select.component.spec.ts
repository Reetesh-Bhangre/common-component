import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtRangeSelectComponent } from './ct-range-select.component';

describe('CtRangeSelectComponent', () => {
  let component: CtRangeSelectComponent;
  let fixture: ComponentFixture<CtRangeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtRangeSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtRangeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
