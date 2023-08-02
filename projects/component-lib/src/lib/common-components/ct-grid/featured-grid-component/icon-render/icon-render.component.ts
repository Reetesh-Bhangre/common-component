import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'icon-render',
  template: `<span class="cell-with-icon" [ngClass]="params?.data?.systemState">
    <i [class]="params?.data?.iconClass"></i>
    <span class="value">{{
      params?.valueFormatted ? params?.valueFormatted : params?.value
    }}</span>
  </span>`,
  styleUrls: ['./icon-render.component.scss'],
})
export class IconRenderComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
