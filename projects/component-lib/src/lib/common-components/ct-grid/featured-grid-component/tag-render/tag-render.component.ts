import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'tag-render',
  template: `<span class="tag-element {{params?.value | lowercase}}">{{params?.value}}</span>`,
  styleUrls: ['./tag-render.component.scss'],
})
export class TagRenderComponent implements ICellRendererAngularComp {
    public params!: ICellRendererParams;
    agInit(params: ICellRendererParams): void {
        this.params = params;
    }
    refresh(): boolean {
        return false;
    }
}
