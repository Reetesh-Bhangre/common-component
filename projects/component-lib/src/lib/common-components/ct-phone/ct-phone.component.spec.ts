import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtPhoneComponent } from './ct-phone.component';

describe('CtPhoneComponent', () => {
  let component: CtPhoneComponent;
  let fixture: ComponentFixture<CtPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
