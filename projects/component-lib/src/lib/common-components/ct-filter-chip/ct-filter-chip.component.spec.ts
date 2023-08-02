import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtFilterChipComponent } from './ct-filter-chip.component';

describe('CtFilterChipComponent', () => {
  let component: CtFilterChipComponent;
  let fixture: ComponentFixture<CtFilterChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtFilterChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtFilterChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
