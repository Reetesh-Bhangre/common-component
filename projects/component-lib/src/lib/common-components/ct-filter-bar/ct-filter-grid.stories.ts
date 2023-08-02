import { Component, Input, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ColDef } from 'ag-grid-community';
import { of, Subject } from 'rxjs';
import { CtGridComponent } from '../ct-grid/ct-grid.component';
import { CtGridModule } from '../ct-grid/ct-grid.module';
import gridData from '../ct-grid/mock-data/client-data.json';
import { CtFilterBarModule } from './ct-filter-bar.module';
import { FilterChipType } from '../ct-filter-chip/filter-chip.model';

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
    headerName: 'Activity ID',
    field: 'messageId',
    tooltipField: 'messageId',
  },
  {
    headerName: 'Activity Type',
    field: 'dataObject.activityType',
    width: 50,
    sortable: true,
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
    headerName: 'Raw Message',
    field: 'json',
    cellClass: 'cell-text-wrap',
    width: 190,
    editable: true,
    cellEditor: 'agLargeTextCellEditor',
    singleClickEdit: true,
  },
  {
    headerName: 'Error Message',
    field: 'errors',
    width: 40,
    cellStyle: { 'padding-left': '6px', 'padding-right': '0px' },
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
    <ct-filter-bar
      [filtersList]="filtersList"
      (onFiltersChanged)="onFiltersChanged($event)"></ct-filter-bar>
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
  @Input() fitToWindow: boolean;
  @Input() gridHeight: string;
  @Input() gridColumn: any;
  @Input() rowModelType = 'infinite';
  @Input() gridDefaultColDef: any;
  @Input() filtersList: any[];
  filterState: any;

  @ViewChild('hubCommunicationGrid')
  hubCommunicationGrid!: CtGridComponent;

  refreshObservable = new Subject<void>();

  RefreshGrid() {
    console.log('RefreshGrid triggerd');
    this.refreshObservable.next();
  }

  onFilterApply(event: any) {
    console.log(event);
    this.filterState = event;
    this.hubCommunicationGrid?.gridReadyParams?.api.onFilterChanged();
  }

  onFiltersChanged(event: any) {
    console.log('onFiltersChanged--->', event);
    this.filterState = event;
    this.hubCommunicationGrid?.gridReadyParams?.api.onFilterChanged();
  }

  getData = (tmpParams?: any[], page?: number, size?: number) => {
    console.log('-------------------------------------');
    console.log('> Page--->', page);
    console.log('> Size--->', size);

    const queryParams: any = {
      page: page,
      size: size,
      filterState: this.filterState,
    };
    console.log('queryParams--->', queryParams);
    return of(gridData);
  };
}
export default {
  title: 'Component/Common Components/Filter Bar',
  component: DebugComponent,
  decorators: [
    moduleMetadata({
      imports: [CtGridModule, CtFilterBarModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [DebugComponent],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const filterBarGridTemplate: Story = args => ({
  props: args,
  template: `
     <grid-lib-debug  [gridDefaultColDef]="gridDefaultColDef"  [filtersList]="filtersList" [gridColumn]="gridColumn" [fitToWindow]="fitToWindow" [gridHeight]="gridHeight" ></grid-lib-debug>
      `,
});

export const filterBarWithGrid = filterBarGridTemplate.bind({});
filterBarWithGrid.args = {
  fitToWindow: true, // Enables auto fit grid feature to the base Grid (grid only with no container). It fits the grid according to the browser window.
  gridHeight: '200px', // Provides the specific height to grid.
  gridColumn: [...gridColumn], // the column configuration of grid.
  gridDefaultColDef: gridDefaultColDef, // Any configuration set inside gridDefaultColDef is apply on all the columns defined under gridColumn.
  rowModelType: 'client',
  filtersList: [
    {
      filterChipId: FilterChipType.input,
      filterDisplayName: 'Direction',
      filterId: 'ctInputFilter', // unique key
      fieldName: 'direction',
      filterName: 'direction',
      filterProps: {
        title: 'Placeholder direction',
        value: 'direction',
      },
      filterValidations: {
        errStatus: false,
        errMessages: [
          {
            email: 'This is invalid direction',
          },
          {
            invalid: 'This is invalid direction',
          },
        ],
      },
      isRequired: true,
    },
    {
      filterChipId: FilterChipType.select,
      filterDisplayName: 'Multi Select',
      filterId: 'ctSelectFilter', // unique key
      fieldName: 'email',
      filterName: 'txtEmail',
      filterProps: {
        title: '',
        isMaterial: false,
        singleSelectionMode: false,
        visibleProperty: 'name',
        selectorList: [
          { id: 1, name: 'Dock_02' },
          { id: 2, name: 'Dock_04' },
          { id: 3, name: 'Dock_06' },
          { id: 4, name: 'Dock_08' },
          { id: 5, name: 'Dock_10' },
          { id: 6, name: 'Dock_12' },
          { id: 7, name: 'Dock_14' },
          { id: 8, name: 'Dock_16' },
          { id: 9, name: 'Dock_18' },
          { id: 10, name: 'Dock_20' },
          { id: 11, name: 'Dock_22' },
          { id: 12, name: 'Dock_24' },
          { id: 13, name: 'Dock_26' },
          { id: 14, name: 'Dock_XX' },
        ],
        value: [{ id: 2, name: 'Dock_04' }],
      },
      filterValidations: {
        errStatus: false,
        errMessages: [
          {
            email: 'This is invalid email',
          },
          {
            invalid: 'This is invalid email',
          },
        ],
      },
      filterWarnings: false,
      filterStyles: {},
      filterWidth: '70px',
      isRequired: true,
    },
    {
      filterChipId: FilterChipType.select,
      filterDisplayName: 'single Select',
      filterId: 'ctSelectFilter', // unique key
      fieldName: 'email',
      filterName: 'txtEmail',
      filterProps: {
        title: '',
        isMaterial: false,
        singleSelectionMode: true,
        visibleProperty: 'name',
        selectorList: [
          { id: 1, name: 'Dock_02' },
          { id: 2, name: 'Dock_04' },
          { id: 3, name: 'Dock_06' },
          { id: 4, name: 'Dock_08' },
          { id: 5, name: 'Dock_10' },
          { id: 6, name: 'Dock_12' },
          { id: 7, name: 'Dock_14' },
          { id: 8, name: 'Dock_16' },
          { id: 9, name: 'Dock_18' },
          { id: 10, name: 'Dock_20' },
          { id: 11, name: 'Dock_22' },
          { id: 12, name: 'Dock_24' },
          { id: 13, name: 'Dock_26' },
          { id: 14, name: 'Dock_XX' },
        ],
        value: [{ id: 2, name: 'Dock_04' }],
      },
      filterValidations: {
        errStatus: false,
        errMessages: [
          {
            email: 'This is invalid email',
          },
          {
            invalid: 'This is invalid email',
          },
        ],
      },
      filterWarnings: false,
      filterStyles: {},
      filterWidth: '70px',
      isRequired: true,
    },
    {
      filterChipId: FilterChipType.datepicker,
      filterDisplayName: 'Date',
      filterId: 'ctDatepickerFilter', // unique key
      fieldName: 'date',
      filterName: 'date',
      filterProps: {
        title: '',
        value: '',
        isDateRange: false,
      },
      filterValidations: {
        errStatus: false,
        errMessages: [],
      },
      isRequired: true,
    },
    {
      filterChipId: FilterChipType.datepicker,
      filterDisplayName: 'Date Range',
      filterId: 'ctDateRangepickerFilter', // unique key
      fieldName: 'date',
      filterName: 'date',
      filterProps: {
        title: '',
        value: '',
        isDateRange: true,
      },
      filterValidations: {
        errStatus: false,
        errMessages: [],
      },
      isRequired: true,
    },
  ],
};
