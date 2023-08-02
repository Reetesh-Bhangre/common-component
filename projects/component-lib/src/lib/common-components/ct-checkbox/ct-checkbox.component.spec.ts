import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtCheckboxComponent } from './ct-checkbox.component';

describe('CtCheckboxComponent', () => {
  let component: CtCheckboxComponent;
  let fixture: ComponentFixture<CtCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
