import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { AgGridModule } from 'ag-grid-angular';

import { CtGridComponent } from './ct-grid.component';

import { DeleteIconBtnComponent } from './featured-grid-component/delete-icon-btn/delete-icon-btn.component';
import { TagRenderComponent } from './featured-grid-component/tag-render/tag-render.component';
import { SelectAllCheckboxComponent } from './featured-grid-component/select-all-checkbox/select-all-checkbox.component';
import { AnchorRenderComponent } from './featured-grid-component/anchor-render/anchor-render.component';
import { IconRenderComponent } from './featured-grid-component/icon-render/icon-render.component';
import { RegisterButtonRenderComponent } from './featured-grid-component/register-button-render/register-button-render.component';

@NgModule({
  declarations: [
    CtGridComponent,
    DeleteIconBtnComponent,
    TagRenderComponent,
    SelectAllCheckboxComponent,
    AnchorRenderComponent,
    IconRenderComponent,
    RegisterButtonRenderComponent,
  ],
  imports: [CommonModule, AgGridModule, FormsModule, MatCheckboxModule],
  exports: [
    CtGridComponent,
    DeleteIconBtnComponent,
    TagRenderComponent,
    SelectAllCheckboxComponent,
    AnchorRenderComponent,
    IconRenderComponent,
    RegisterButtonRenderComponent,
  ],
  providers: [DatePipe],
})
export class CtGridModule {}
