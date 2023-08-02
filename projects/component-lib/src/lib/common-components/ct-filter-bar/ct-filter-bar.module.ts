import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CtFilterChipModule } from './../ct-filter-chip/ct-filter-chip.module';

import { CtFilterBarComponent } from './ct-filter-bar.component';

@NgModule({
  declarations: [CtFilterBarComponent],
  imports: [CommonModule, CtFilterChipModule],
  exports: [CtFilterBarComponent],
})
export class CtFilterBarModule {}
