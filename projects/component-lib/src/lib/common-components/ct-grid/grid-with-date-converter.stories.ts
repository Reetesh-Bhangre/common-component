import { Component, Input, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { of, Subject } from 'rxjs';
import { CtGridComponent } from './ct-grid.component';
import { CtGridModule } from './ct-grid.module';

import gridData from './mock-data/door-list.json';

const gridColumn = [
  {
    headerName: 'Name',
    field: 'doorDisplayName',
    tooltipField: 'doorDisplayName',
    flex: 1,
  },
  {
    headerName: 'Identifier',
    field: 'doorName',
    tooltipField: 'doorName',
    flex: 1,
  },
  {
    headerName: 'Zone',
    field: 'zoneName',
    flex: 1,
  },
  {
    headerName: 'Last Message Received',
    field: 'eventTime',
    flex: 1,
    dateConverter: ['UTC+05:30', 'dd-MM-yyyy, hh:mm:ss a'],
  },
  {
    headerName: 'Status',
    field: 'registered',
    flex: 1,
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
      #dockDoorList
      [fitToWindow]="fitToWindow"
      [gridColumn]="gridColumn"
      [gridDefaultColDef]="gridDefaultColDef"
      [rowModelType]="rowModelType"
      [paginationPageSize]="5"
      [rowHeight]="60"
      [getData]="getData"
      [headerHeight]="headerHeight"
      [totalElementsKeyName]="'totalRecords'"
      [dataKeyName]="'records'"
      [refreshObservable]="refreshObservable"
      [gridRowVirtualization]="true"
      (refresh)="refreshObservable.next()"
      (gridReadyEmitter)="doorListGridReady($event)">
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
    if (page === 2) {
      const data = {
        pageNumber: 0,
        pageSize: 5,
        totalPages: 0,
        totalRecords: 0,
        records: [],
      };

      return of(data);
    } else {
      return of(gridData);
    }
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

export const withDateConverter = TemplateDefault.bind({});
withDateConverter.args = {};
