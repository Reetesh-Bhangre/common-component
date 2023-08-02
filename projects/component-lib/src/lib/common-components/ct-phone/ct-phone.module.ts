import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IntPhoneComponentModule } from './../../core/int-phone-component/int-phone-component.module';

import { CtPhoneComponent } from './ct-phone.component';

@NgModule({
  declarations: [CtPhoneComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    IntPhoneComponentModule,
  ],
  exports: [CtPhoneComponent],
})
export class CtPhoneModule {}
