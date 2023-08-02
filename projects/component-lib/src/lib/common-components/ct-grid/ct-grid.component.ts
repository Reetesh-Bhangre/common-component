import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  FilterChangedEvent,
  GridOptions,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  RowClickedEvent,
  RowNode,
  RowSelectedEvent,
} from 'ag-grid-community';

import { format } from 'date-fns';

import { Observable, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';

import { TagRenderComponent } from './featured-grid-component/tag-render/tag-render.component';
import { DeleteIconBtnComponent } from './featured-grid-component/delete-icon-btn/delete-icon-btn.component';
import { SelectAllCheckboxComponent } from './featured-grid-component/select-all-checkbox/select-all-checkbox.component';
import { AnchorRenderComponent } from './featured-grid-component/anchor-render/anchor-render.component';
import { IconRenderComponent } from './featured-grid-component/icon-render/icon-render.component';
import { RegisterButtonRenderComponent } from './featured-grid-component/register-button-render/register-button-render.component';

import { GridConstant } from './ct-grid-constant';

@Component({
  selector: 'ct-grid',
  templateUrl: './ct-grid.component.html',
  styleUrls: ['./ct-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtGridComponent implements OnInit {
  private _gridColumn!: any;
  private _gridHeight: string;
  private _gridData;
  private _gridPagination = true;
  private _destroy$ = new Subject();
  private readonly _getData$ = new Subject<boolean>();

  public cacheOverflowSize = 50;
  public maxConcurrentDatasourceRequests = 2;
  public infiniteInitialRowCount = 1;
  public maxBlocksInCache = 2;
  public gridHeaderHeight = 34;
  public gridRowHeight = 34;
  public selectedRow: RowNode<any>[];
  public gridReadyParams: GridReadyEvent;
  public context: any;
  public frameworkComponents: any;
  public errorMessage = 'No Rows To Show';

  /**
   * gridContainerRefEl will help to get element reference of grid container
   */
  @ViewChild('gridContainerRef') gridContainerRefEl!: ElementRef;

  @ViewChild('agGrid')
  agGrid?: AgGridAngular;
  /**
   * fitToWindow default is true.
   * fitToWindow is used to set grid height as 100% of container height.
   */
  @Input() fitToWindow = true;
  @Input() public get gridHeight() {
    return this._gridHeight;
  }
  public set gridHeight(value) {
    this._gridHeight = value;
    if (this.gridContainerRefEl && this.gridContainerRefEl.nativeElement) {
      this.gridContainerRefEl.nativeElement.style.height = this.fitToWindow
        ? `calc(100vh - ${
            this.gridContainerRefEl?.nativeElement?.getBoundingClientRect()
              .top + 17
          }px)`
        : value;
    }
  }

  @Input() get gridColumn() {
    return this._gridColumn;
  }
  set gridColumn(value) {
    this._gridColumn = value;
    if (value.length > 0) {
      this.addColumnDynamicProperties();
    }
  }

  @Input() get gridData() {
    return this._gridData;
  }
  set gridData(list) {
    this._gridData = list;
  }

  @Input() get gridPagination() {
    return this._gridPagination;
  }
  set gridPagination(value) {
    this._gridPagination = value;
  }

  //   @Input() gridData!: unknown[];
  @Input() gridDefaultColDef!: ColDef;
  /**
   * Any configuration set inside gridOptions is apply on all the grid that can be used instead of or in addition to the normal framework bindings.
   * gridOptions properties and callbacks used to configure the grid.
   */
  @Input() gridOptions: GridOptions = {};
  @Input() rowModelType!: any;
  @Input() paginationPageSize = 5;
  @Input() rowHeight: number;
  @Input() headerHeight: number;
  @Input() rowSelection: 'single' | 'multiple' = 'multiple'; // 'multiple'/'single'
  @Input() rowMultiSelectWithClick = false;

  @Input()
  lastRow = -1;

  @Input()
  overlayLoadingTemplate: any = this.overlayTemplate();

  @Input()
  overlayNoRowsTemplate: any = this.noRowTemplate();

  // TODO: Define get Data arguments type
  @Input()
  getData!: (sorts: any[], page?: number, size?: number) => Observable<any>;

  @Input()
  refreshObservable: Observable<any> = new Subject<any>();

  @Input() totalElementsKeyName = 'totalElements';
  @Input() dataKeyName = 'content';
  @Input() gridRowVirtualization = false;
  @Input() gridColVirtualization = false;

  @Output()
  refresh = new EventEmitter<void>();

  @Output() gridReadyEmitter: EventEmitter<GridReadyEvent> =
    new EventEmitter<GridReadyEvent>();

  @Output() rowClickedEvent: EventEmitter<any> = new EventEmitter();

  @Output() selectedRowEvent: EventEmitter<any> = new EventEmitter();

  @Output() paginationChange: EventEmitter<any> = new EventEmitter();

  @Output() trashClick: EventEmitter<any> = new EventEmitter();

  @Output() anchorClick: EventEmitter<any> = new EventEmitter();

  @Output() registerClick: EventEmitter<any> = new EventEmitter();

  /** Function Will use to add dynamic class on row */
  getRowClass = params => {
    // Add a class unread-row if row data.isRead is false
    if (params?.data?.isRead === false) {
      return GridConstant.unReadClass.className;
    }
  };

  constructor() {
    this.frameworkComponents = {
      selectAllRender: SelectAllCheckboxComponent,
      tagRender: TagRenderComponent,
      withIconRender: IconRenderComponent,
      deleteIconBtnRender: DeleteIconBtnComponent,
      anchorCellRender: AnchorRenderComponent,
      registerBtnRender: RegisterButtonRenderComponent,
    };
    this.context = { componentParent: this };
  }

  ngOnInit(): void {
    if (this.refreshObservable) {
      this.refreshObservable
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this.refreshTable());
    }

    if (this.gridDefaultColDef) {
      this.gridDefaultColDef.icons = {
        sortAscending: '<i class="fas fa-caret-up"></i>',
        sortDescending: '<i class="fas fa-caret-down"></i>',
      };
      this.gridDefaultColDef.unSortIcon = true;
    }
  }

  ngAfterViewInit() {
    /**
     * Below code help to set the grid height conditionally.
     * If grid is fitToWindow, it fits the grid according to the browser window.
     * Else it sets the fix grid height default is 500px.
     */
    this.gridContainerRefEl.nativeElement.style.height = this.fitToWindow
      ? `calc(100vh - ${
          this.gridContainerRefEl?.nativeElement?.getBoundingClientRect().top +
          20
        }px)`
      : this.gridHeight;

    // add style to ag-overlay
    const gridOverlay =
      this.gridContainerRefEl.nativeElement.querySelector('.ag-overlay');
    gridOverlay.style.top = this.headerHeight + 'px';
  }

  ngOnDestroy() {
    this._getData$.complete();
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  overlayTemplate() {
    return `
        <div class="overlay-loading">
            <div class="load-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span class="loading-text">Loading...</span>
        </div> 
        `;
  }

  noRowTemplate() {
    return `<span class="no-row-text">${this.errorMessage}</span>`;
  }

  refreshTable() {
    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: this.getRows,
    };
    this.gridReadyParams.api.setDatasource(dataSource);
  }

  /**
   * When the grid is initialized, the gridReady event will fire.
   * Here we stored some of the grid API value into the variables
   */
  onGridReady(gridReady: GridReadyEvent) {
    this.gridReadyParams = gridReady;
    window.addEventListener('resize', function () {
      setTimeout(function () {
        this.gridReadyParams?.api.sizeColumnsToFit();
      });
    });
    if (this.rowModelType === 'clientSide') {
      // TODO: Set total records
    } else {
      const dataSource: IDatasource = {
        rowCount: undefined,
        getRows: this.getRows,
      };
      this.gridReadyParams.api.setDatasource(dataSource);
    }

    this.gridReadyEmitter.emit(gridReady);
  }

  addColumnDynamicProperties() {
    this.gridColumn.map((value, key) => {
      if (value.dateTimeFormatter) {
        this.gridColumn[key] = {
          ...value,
          cellRenderer: this.dateTimeFormatter.bind(
            value,
            value.dateTimeFormatter
          ),
        };
      }

      if (value.dateConverter) {
        this.gridColumn[key] = {
          ...value,
          cellRenderer: this.dateConverter.bind(value, value.dateConverter),
        };
      }

      if (value.headerCheckboxSelection) {
        value.headerComponentFramework = SelectAllCheckboxComponent;
      }
    });
  }

  // Convert cell data to user defined date format
  dateTimeFormatter(type, valueObj) {
    if (valueObj.value) {
      return format(new Date(valueObj.value), type);
    }
  }

  // Convert the actual date with given timezone
  dateConverter(type, valueObj) {
    if (valueObj.value) {
      const value = new Date(valueObj.value + ' ' + type[0]);
      return format(new Date(value), type[1]);
    }
  }

  private getRows = (params: IGetRowsParams) => {
    const page = Math.floor(params.startRow / this.paginationPageSize);
    // TODO: Remove logs
    console.log('asking for ' + params.startRow + ' to ' + params.endRow);
    this.gridReadyParams.api.showLoadingOverlay();
    this._getData$
      .pipe(
        switchMap(() =>
          this.getData(params.sortModel, page, this.paginationPageSize)
        ),
        take(1)
      )
      .subscribe({
        next: data => {
          if (data[this.totalElementsKeyName] && data[this.dataKeyName]) {
            const lastRow = data[this.totalElementsKeyName];
            if (!data[this.dataKeyName] || !data[this.dataKeyName].length) {
              this.gridReadyParams.api.showNoRowsOverlay();
            } else {
              this.gridReadyParams.api.hideOverlay();
            }
            params?.successCallback(data[this.dataKeyName], lastRow);
            this.agGrid?.api.sizeColumnsToFit();
          } else if (
            data.data &&
            data.data[this.totalElementsKeyName] !== undefined &&
            data.data[this.dataKeyName] !== undefined
          ) {
            const lastRow = data.data[this.totalElementsKeyName];
            if (
              !data.data[this.dataKeyName] ||
              !data.data[this.dataKeyName].length
            ) {
              this.gridReadyParams.api.showNoRowsOverlay();
            } else {
              this.gridReadyParams.api.hideOverlay();
            }
            params?.successCallback(data.data[this.dataKeyName], lastRow);
            this.agGrid?.api.sizeColumnsToFit();
          }
        },
        error: () => {
          const lastRow = 0;
          params?.successCallback([], lastRow);
          this.gridReadyParams.api.hideOverlay();
          this.gridReadyParams.api.showNoRowsOverlay();
        },
      });
    this._getData$.next(true);
  };

  getLastRow(): number {
    return this.lastRow;
  }

  /**
   * When the grid Row is selected or deselected. The event will be trigger
   * Also update the selectedRow variable
   */
  onRowSelected($event: RowSelectedEvent) {
    this.selectedRow = $event.api.getSelectedNodes();
    this.selectedRowEvent.emit(this.selectedRow);
  }

  /**
   * It will call onRowSelected function automatically and update the selectedRow array
   */
  onRowClicked(event: RowClickedEvent) {
    this.rowClickedEvent.emit(event);
    if (this.selectedRow && this.selectedRow.length > 0) {
      this.selectedRow.every((rowData: any, index: number): boolean => {
        if (rowData.rowIndex === event.rowIndex) {
          this.selectedRow[index].setSelected(false);
          return false;
        }
        return true;
      });
    }
  }

  onFilterChanged($event: FilterChangedEvent) {
    console.log('Filter changes', $event);
    // TODO: Handle filter changed event
  }

  cellButtonClick(event) {
    this.trashClick.emit(event);
    console.log('Cell Button Click event', event);
  }

  anchorCellClick(event) {
    this.anchorClick.emit(event);
    console.log('Cell Anchor Click event', event);
  }

  registerBtnClick(event) {
    this.registerClick.emit(event);
    console.log('Cell Register Click event', event);
  }

  paginationChanged(event) {
    this.gridReadyParams?.api?.deselectAll();
    this.paginationChange.emit(event);
  }
}
