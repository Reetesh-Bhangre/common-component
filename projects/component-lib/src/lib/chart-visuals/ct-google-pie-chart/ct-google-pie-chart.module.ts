import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CtGooglePieChartComponent } from './ct-google-pie-chart.component';

@NgModule({
  declarations: [CtGooglePieChartComponent],
  imports: [CommonModule, Ng2GoogleChartsModule],
  exports: [CtGooglePieChartComponent],
})
export class CtGooglePieChartModule {}
