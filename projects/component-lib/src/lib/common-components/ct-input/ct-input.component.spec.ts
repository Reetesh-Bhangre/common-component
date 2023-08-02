import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtInputComponent } from './ct-input.component';

describe('CtInputComponent', () => {
  let component: CtInputComponent;
  let fixture: ComponentFixture<CtInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
