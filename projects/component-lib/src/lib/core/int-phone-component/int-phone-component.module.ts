import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { NativeElementInjectorDirective } from './directives/native-element-injector.directive';
import { IntPhoneComponentComponent } from './int-phone-component.component';

export const dropdownModuleForRoot: ModuleWithProviders<BsDropdownModule> =
  BsDropdownModule.forRoot();

@NgModule({
  declarations: [IntPhoneComponentComponent, NativeElementInjectorDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    dropdownModuleForRoot,
  ],
  exports: [IntPhoneComponentComponent, NativeElementInjectorDirective],
})
export class IntPhoneComponentModule {}
