import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtNotificationPopupComponent } from './ct-notification-popup.component';

describe('CtNotificationPopupComponent', () => {
  let component: CtNotificationPopupComponent;
  let fixture: ComponentFixture<CtNotificationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtNotificationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
