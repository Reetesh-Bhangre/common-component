import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtNotificationComponent } from './ct-notification.component';

describe('CtNotificationComponent', () => {
  let component: CtNotificationComponent;
  let fixture: ComponentFixture<CtNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
