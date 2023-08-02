import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtCheckboxComponent } from './ct-checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CtCheckboxComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCheckboxModule],
  exports: [CtCheckboxComponent],
})
export class CtCheckboxModule {}
