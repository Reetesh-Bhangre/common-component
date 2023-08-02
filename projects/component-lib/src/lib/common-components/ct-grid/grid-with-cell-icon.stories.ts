import { Component, Input, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { of, Subject } from 'rxjs';
import { CtGridComponent } from './ct-grid.component';
import { CtGridModule } from './ct-grid.module';

import gridData from './mock-data/dock-live-data.json';

const gridColumn = [
  {
    headerName: 'State',
    field: 'systemState',
    tooltipField: 'systemState',
    sortable: false,
  },
  {
    headerName: 'Status',
    field: 'stateDisplayName',
    tooltipField: 'stateDisplayName',
    sortable: false,
    cellRenderer: 'withIconRender',
  },
  {
    headerName: 'Time Start',
    field: 'eventTime',
    tooltipField: 'eventTime',
    flex: 1,
    sortable: true,
    dateTimeFormatter: 'hh:mm:ss b',
  },
  {
    headerName: 'Length',
    field: 'length',
    tooltipField: 'length',
    flex: 2,
    sortable: false,
    resizable: false,
  },
];

const gridDefaultColDef = {
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

export const withCellIcon = TemplateDefault.bind({});
withCellIcon.args = {};
