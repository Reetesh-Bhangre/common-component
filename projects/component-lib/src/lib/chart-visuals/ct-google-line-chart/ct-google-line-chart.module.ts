import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CtGoogleLineChartComponent } from './ct-google-line-chart.component';

@NgModule({
  declarations: [CtGoogleLineChartComponent],
  imports: [CommonModule, Ng2GoogleChartsModule],
  exports: [CtGoogleLineChartComponent],
})
export class CtGoogleLineChartModule {}
