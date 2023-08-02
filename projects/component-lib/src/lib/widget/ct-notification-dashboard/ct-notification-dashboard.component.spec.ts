import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtNotificationDashboardComponent } from './ct-notification-dashboard.component';

describe('CtNotificationDashboardComponent', () => {
  let component: CtNotificationDashboardComponent;
  let fixture: ComponentFixture<CtNotificationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtNotificationDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtNotificationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
