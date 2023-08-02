import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CtGoogleBarChartComponent } from './ct-google-bar-chart.component';

@NgModule({
  declarations: [CtGoogleBarChartComponent],
  imports: [CommonModule, Ng2GoogleChartsModule],
  exports: [CtGoogleBarChartComponent],
})
export class CtGoogleBarChartModule {}
