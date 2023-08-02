import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtGoogleBarChartComponent } from './ct-google-bar-chart.component';

describe('CtGoogleBarChartComponent', () => {
  let component: CtGoogleBarChartComponent;
  let fixture: ComponentFixture<CtGoogleBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtGoogleBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtGoogleBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
