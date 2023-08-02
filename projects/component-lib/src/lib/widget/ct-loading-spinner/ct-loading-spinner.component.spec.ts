import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtLoadingSpinnerComponent } from './ct-loading-spinner.component';

describe('CtLoadingSpinnerComponent', () => {
  let component: CtLoadingSpinnerComponent;
  let fixture: ComponentFixture<CtLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtLoadingSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
