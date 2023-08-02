import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtWidgetLoadingComponent } from './ct-widget-loading.component';

describe('CtWidgetLoadingComponent', () => {
  let component: CtWidgetLoadingComponent;
  let fixture: ComponentFixture<CtWidgetLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtWidgetLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtWidgetLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
