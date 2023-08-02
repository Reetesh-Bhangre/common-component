import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { CtRangeSelectComponent } from './ct-range-select.component';

@NgModule({
  declarations: [CtRangeSelectComponent],
  imports: [CommonModule, NgxSliderModule],
  exports: [CtRangeSelectComponent],
})
export class CtRangeSelectModule {}
