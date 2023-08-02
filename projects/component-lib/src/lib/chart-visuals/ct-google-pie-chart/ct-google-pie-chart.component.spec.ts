import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtGooglePieChartComponent } from './ct-google-pie-chart.component';

describe('CtGooglePieChartComponent', () => {
  let component: CtGooglePieChartComponent;
  let fixture: ComponentFixture<CtGooglePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtGooglePieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtGooglePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
