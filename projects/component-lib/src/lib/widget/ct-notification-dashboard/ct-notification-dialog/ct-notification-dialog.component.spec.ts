import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtNotificationDialogComponent } from './ct-notification-dialog.component';

describe('CtNotificationDialogComponent', () => {
  let component: CtNotificationDialogComponent;
  let fixture: ComponentFixture<CtNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtNotificationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
