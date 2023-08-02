import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'delete-icon-btn',
  template: `<button (click)="deleteRow($event)" class="btn icon-btn">
    <i class="fa-solid fa-trash-can"></i>
  </button>`,
  styleUrls: ['./delete-icon-btn.component.scss'],
})
export class DeleteIconBtnComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  public deleteRow(event) {
    this.params.context.componentParent.cellButtonClick(this.params.data);
    event.stopPropagation();
  }
}
