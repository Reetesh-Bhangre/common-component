import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from './../../core/select/ng-select.module';

import { MatTooltipModule } from '@angular/material/tooltip';

import { CtSelectComponent } from './ct-select.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [CtSelectComponent],
  imports: [
    CommonModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatTooltipModule,
    TranslocoModule,
  ],
  exports: [CtSelectComponent],
})
export class CtSelectModule {}
