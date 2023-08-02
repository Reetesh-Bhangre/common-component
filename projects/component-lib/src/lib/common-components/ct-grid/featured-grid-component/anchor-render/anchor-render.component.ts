import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'anchor-render',
  template: `<span class="anchor-element" (click)="anchorClick($event)">
    {{ params?.valueFormatted ? params?.valueFormatted : params?.value }}
  </span>`,
  styleUrls: ['./anchor-render.component.scss'],
})
export class AnchorRenderComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }

  public anchorClick(event) {
    this.params.context.componentParent.anchorCellClick(this.params.data);
    event.stopPropagation();
  }
}
