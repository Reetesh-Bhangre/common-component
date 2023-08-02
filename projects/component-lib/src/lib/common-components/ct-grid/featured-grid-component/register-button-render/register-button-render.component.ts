import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'register-button-render',
  template: `<span class="register-container">
    <button
      class="register"
      (click)="registerClick($event)"
      *ngIf="!params.value; else register">
      Register
    </button>
    <ng-template #register><span> Registered </span></ng-template>
  </span>`,
  styleUrls: ['./register-button-render.component.scss'],
})
export class RegisterButtonRenderComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }

  // Event handel on register button click
  registerClick(event) {
    this.params.context.componentParent.registerBtnClick(this.params.data);
    event.stopPropagation();
  }
}
