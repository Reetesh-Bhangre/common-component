import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'select-all-checkbox',
  templateUrl: './select-all-checkbox.component.html',
  styleUrls: ['./select-all-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAllCheckboxComponent implements IHeaderAngularComp {
  headerName: string;
  isChecked = false;
  isIndeterminate: boolean;
  showCheckBox = true;
  sortIcon = 'none';
  sortSubIcon = 'none';
  params: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  agInit(params: IHeaderParams | any): void {
    this.params = params;
    this.headerName = this.params?.displayName;
    this.params.api.addEventListener('selectionChanged', () => {
      this.setCheckboxState();
    });

    this.showCheckBox = this.params?.checkboxSelection;
  }

  toggleSelect(event): void {
    this.isChecked = event.target.checked;
    if (this.isChecked) {
      const nodes = this.params?.api?.getRenderedNodes();
      nodes.forEach(node => {
        node.selectThisNode(true);
      });

      const event: any = {
        type: 'selectionChanged',
        api: this.params.api,
        columnApi: this.params.columnApi,
      };

      this.params?.api?.eventService?.dispatchEvent(event);
    } else {
      this.params.api.deselectAll();
    }
  }

  onSortRequested(event: any): void {
    this.params.progressSort(event.shiftKey);
  }

  refresh(): boolean {
    return false;
  }

  resetCheckbox() {
    this.isChecked = false;
  }

  private setCheckboxState(): void {
    this.isIndeterminate = false;
    const selectedNodesLength: number =
      this.params?.api?.getSelectedRows()?.length;
    const renderedNodesLength: number =
      this.params?.api?.getRenderedNodes().length;
    this.isChecked =
      selectedNodesLength > 0 && selectedNodesLength === renderedNodesLength;
    this.isIndeterminate = selectedNodesLength > 0 && !this.isChecked;
    this.cdRef.detectChanges();
  }
}
