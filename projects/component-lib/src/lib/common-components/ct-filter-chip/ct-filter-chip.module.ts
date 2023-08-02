import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtFilterChipComponent } from './ct-filter-chip.component';
import { InsertionDirective } from './insertion.directive';
import { CtSelectModule } from './../ct-select/ct-select.module';
import { CtDatePickerModule } from '../ct-date-picker/ct-date-picker.module';
@NgModule({
  declarations: [CtFilterChipComponent, InsertionDirective],
  imports: [CommonModule, CtSelectModule, CtDatePickerModule],
  exports: [CtFilterChipComponent],
})
export class CtFilterChipModule {}
