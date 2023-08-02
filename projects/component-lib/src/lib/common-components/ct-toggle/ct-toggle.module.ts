import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CtToggleComponent } from './ct-toggle.component';

@NgModule({
  declarations: [CtToggleComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CtToggleComponent],
})
export class CtToggleModule {}
