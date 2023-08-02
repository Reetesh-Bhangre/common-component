import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CtInputModule } from './../ct-input/ct-input.module';
import { CtDatePickerModule } from './../ct-date-picker/ct-date-picker.module';
import { CtSelectModule } from './../ct-select/ct-select.module';
import { CtToggleModule } from './../ct-toggle/ct-toggle.module';
import { CtRangeSelectModule } from './../ct-range-select/ct-range-select.module';

import { CtReactiveFormComponent } from './ct-reactive-form.component';
import { CtTimepickerModule } from '../ct-timepicker/ct-timepicker.module';
import { CtPhoneModule } from '../ct-phone/ct-phone.module';

@NgModule({
  declarations: [CtReactiveFormComponent],
  imports: [
    CommonModule,
    CtInputModule,
    CtDatePickerModule,
    CtSelectModule,
    CtToggleModule,
    CtRangeSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CtTimepickerModule,
    CtPhoneModule
  ],
  exports: [CtReactiveFormComponent],
})
export class CtReactiveFormModule {}
