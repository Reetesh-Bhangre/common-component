import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ct-filter-bar',
  templateUrl: './ct-filter-bar.component.html',
  styleUrls: ['./ct-filter-bar.component.scss'],
})
export class CtFilterBarComponent {
  private _filtersList: any;

  public filterState = [];

  @Input()
  get filtersList() {
    return this._filtersList;
  }
  set filtersList(list) {
    if (list) {
      this._filtersList = list;
    }
  }

  @Output('onFilterApply') onFilterApply = new EventEmitter<any>();
  @Output() onFiltersChanged = new EventEmitter<any[]>();

  onChipValueChange(filterValue) {
    console.log('---Filter bar:: on chip value change----', filterValue);
    let isPublish = false;
    const index = this.findByFilterId(this.filterState, filterValue.chipConfig);
    if (index !== -1) {
      if (filterValue?.status === 'INVALID') {
        // Remove filter
        this.filterState.splice(index, 1);
        isPublish = true;
      } else {
        if (
          filterValue?.chipValue?.value?.length !== 0 &&
          filterValue?.chipValue?.value !== undefined &&
          filterValue?.chipValue?.value !== null &&
          filterValue?.chipValue?.value !== ''
        ) {
          this.filterState[index].value = filterValue.chipValue.value;

          isPublish = true;
        } else {
          this.filterState.splice(index, 1);
          isPublish = true;
        }
      }
    } else {
      if (filterValue?.chipValue?.status === 'VALID') {
        if (
          filterValue?.chipValue?.value?.length !== 0 &&
          filterValue?.chipValue?.value !== undefined &&
          filterValue?.chipValue?.value !== null &&
          filterValue?.chipValue?.value !== ''
        ) {
          this.filterState.push({
            filterId: filterValue.chipConfig.filterId,
            value: filterValue.chipValue.value,
          });
          isPublish = true;
        }
      }
    }

    // Publish filter chip after validating isRequired filter chip conditions
    this.checkForPublish(isPublish).subscribe((isPublish: boolean) => {
      if (isPublish) {
        this.onFiltersChanged.emit(this.filterState);
      }
    });

    // TODO: Remove once integration with user list is tested
    // if (filterValue.chipValue.status === 'VALID') {
    //   if (chipIndex < 0) {
    //     this.filterState.push({
    //       filterId: filterValue.chipConfig.filterId,
    //       value: filterValue.chipValue.value,
    //     });
    //   } else {
    //     this.filterState[chipIndex].value = filterValue.chipValue.value;
    //   }
    //   this.onFiltersChanged.emit(this.filterState);
    // }
  }

  // Function to validate if the selected list(this.selectedFilters) of chips contains isRequired chip.
  // If it exist then it identify if the final exported chip (this.filterState) list has the isRequired chip. It it is there
  // then it should have the value.
  // If isRequired is in selected filter chip list but not in final exported chip list then it will avoid publish filters.
  // If isRequired chip is in final exported chip list but its value is empty then as well it will avoid publish filters.
  checkForPublish(isPublish: boolean) {
    return new Observable(observer => {
      // Added extra condition here i.e. check if filter is valid or invalid
      // Along with require filter if a filter does not have required property true then as well
      // it should check wheather it is valid or invalid. And if invalid then it should not public the filter value

      this.filtersList.forEach(value => {
        if (
          // eslint-disable-next-line no-prototype-builtins
          value.hasOwnProperty('isRequired') ||
          value.filterValidations.errStatus
        ) {
          if (value.isRequired || value.filterValidations.errStatus) {
            const tmpIndex = this.findByFilterId(this.filterState, value);
            if (tmpIndex === -1) {
              observer.next(false);
              observer.complete();
            }
          }
        }
      });
      observer.next(isPublish);
      observer.complete();
    });
  }

  findByFilterId(allFilters, selectedFilter) {
    return allFilters.findIndex(
      item => item.filterId === selectedFilter.filterId
    );
  }

  applyFilter() {
    this.onFilterApply.emit(this.filterState);
  }
}
