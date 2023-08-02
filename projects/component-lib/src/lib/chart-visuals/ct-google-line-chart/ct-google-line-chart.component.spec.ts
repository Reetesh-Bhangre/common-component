import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtGoogleLineChartComponent } from './ct-google-line-chart.component';

describe('CtGoogleLineChartComponent', () => {
  let component: CtGoogleLineChartComponent;
  let fixture: ComponentFixture<CtGoogleLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtGoogleLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtGoogleLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
