import { Component, Input, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ColDef } from 'ag-grid-community';
import { of, Subject } from 'rxjs';
import { CtGridComponent } from './ct-grid.component';
import { CtGridModule } from './ct-grid.module';

import gridData from './mock-data/client-data.json';

const gridColumn: ColDef[] = [
  {
    headerName: '',
    field: 'selection',
    maxWidth: 150,
    headerCheckboxSelection: true,
    // headerComponent: 'selectAllRender',
    // checkboxSelection: true,
    // headerCheckboxSelection: true, // Enable select/unselect all feature
    // sortable: false,
    checkboxSelection: true,
    headerComponent: 'selectAllRender',
    headerComponentParams: {
      checkboxSelection: true,
    },
  },
  {
    headerName: 'Source',
    field: 'source',
    tooltipField: 'source',
    sortable: false,
    cellRenderer: 'tagRender',
  },
  {
    headerName: 'Activity Type',
    field: 'dataObject.activityType',
    width: 50,
    sortable: false,
    cellRenderer: 'anchorCellRender',
  },
  {
    headerName: 'Device Type',
    field: 'dataObject.deviceType',
    width: 50,
    sortable: true,
  },
  {
    headerName: 'Direction',
    field: 'direction',
    width: 55,
  },
  {
    headerName: 'Timestamp',
    field: 'timestamp',
    width: 65,
    tooltipField: 'timestamp',
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 50,
  },
  {
    headerName: '',
    field: '',
    width: 60,
    cellRenderer: 'deleteIconBtnRender',
    sortable: false,
  },
];

const gridDefaultColDef = {
  minWidth: 100,
  maxWidth: 250,
  sortable: true,
  resizable: true,
};

@Component({
  selector: 'grid-lib-debug',
  template: `
    <button (click)="RefreshGrid()">Refresh</button>
    <ct-grid
      #hubCommunicationGrid
      [fitToWindow]="fitToWindow"
      [gridHeight]="gridHeight"
      [gridData]="gridData"
      [gridColumn]="gridColumn"
      [rowHeight]="100"
      [headerHeight]="50"
      [gridDefaultColDef]="gridDefaultColDef"
      [refreshObservable]="refreshObservable"
      [getData]="getData"
      [rowHeight]="100"
      [rowModelType]="rowModelType"
      (refresh)="refreshObservable.next()">
    </ct-grid>
  `,
})
class DebugComponent {
  @Input() fitToWindow = true;
  @Input() gridHeight = '200px';
  @Input() gridColumn = gridColumn;
  @Input() rowModelType = 'infinite';
  @Input() gridDefaultColDef = gridDefaultColDef;

  @ViewChild('hubCommunicationGrid')
  hubCommunicationGrid!: CtGridComponent;

  refreshObservable = new Subject<void>();

  RefreshGrid() {
    console.log('RefreshGrid triggerd');
    this.refreshObservable.next();
  }

  getData = (tmpParams?: any[], page?: number, size?: number) => {
    console.log('-------------------------------------');
    // console.log('> Filter--->', this.form.value);
    console.log('> Page--->', page);
    console.log('> Size--->', size);
    console.log('> tmpParams--->', tmpParams);
    const queryParams: any = {
      page: page,
      size: size,
    };
    console.log('> queryParams--->', queryParams);
    return of(gridData);
  };
}
export default {
  title: 'Component/Grid: Client',
  component: DebugComponent,
  decorators: [
    moduleMetadata({
      imports: [CtGridModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [DebugComponent],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `
     <grid-lib-debug></grid-lib-debug>
      `,
});

export const withTagUi = TemplateDefault.bind({});
withTagUi.args = {};
