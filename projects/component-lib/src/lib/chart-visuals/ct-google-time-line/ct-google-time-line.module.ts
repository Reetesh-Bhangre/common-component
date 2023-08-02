import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { CtGoogleTimeLineComponent } from './ct-google-time-line.component';

@NgModule({
  declarations: [CtGoogleTimeLineComponent],
  imports: [CommonModule, Ng2GoogleChartsModule],
  exports: [CtGoogleTimeLineComponent],
})
export class CtGoogleTimeLineModule {}
