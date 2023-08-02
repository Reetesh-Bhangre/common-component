import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { MatNativeDateModule } from '@angular/material/core';

import { NgxDaterangepickerMd } from '../../core/daterangepicker/daterangepicker.module';

import { CtDatePickerComponent } from './ct-date-picker.component';

@NgModule({
  declarations: [CtDatePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxDaterangepickerMd.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [CtDatePickerComponent],
})
export class CtDatePickerModule {}
