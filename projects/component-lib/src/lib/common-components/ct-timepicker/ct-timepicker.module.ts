import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { CtInputModule } from '../ct-input/ct-input.module';

import { CtTimepickerComponent } from './ct-timepicker.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    CtTimepickerComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    TextMaskModule,
    CtInputModule,
    MatListModule,
  ],
  exports: [CtTimepickerComponent],

})
export class CtTimepickerModule { }
