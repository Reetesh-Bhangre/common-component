import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSelectComponent } from './ct-select.component';

describe('CtSelectComponent', () => {
  let component: CtSelectComponent;
  let fixture: ComponentFixture<CtSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
