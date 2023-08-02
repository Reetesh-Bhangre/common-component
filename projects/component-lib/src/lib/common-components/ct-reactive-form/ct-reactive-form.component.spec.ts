import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtReactiveFormComponent } from './ct-reactive-form.component';

describe('CtReactiveFormComponent', () => {
  let component: CtReactiveFormComponent;
  let fixture: ComponentFixture<CtReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtReactiveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
