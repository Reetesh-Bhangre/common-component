import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { InsertionDirective } from './insertion.directive';

import {
  IFilterChipDecorator,
  IFilterChipDecoratorRegistry,
} from './filter-chip.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';

//  This is the filter chip decorator registry
export const FilterChipRegistry: Map<string, IFilterChipDecoratorRegistry> =
  new Map();

//  This defines the filter chip decorator registry decorator
export function FilterChip(obj: IFilterChipDecorator) {
  return target => {
    FilterChipRegistry.set(obj.id, { ...obj, target });
  };
}

@Component({
  selector: 'ct-filter-chip',
  templateUrl: './ct-filter-chip.component.html',
  styleUrls: ['./ct-filter-chip.component.scss'],
})
export class CtFilterChipComponent {
  private _chipConfig: any;
  isRequired = false;
  public componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective, { static: true })
  insertionDirective!: InsertionDirective;

  @Input()
  get chipConfig() {
    return this._chipConfig;
  }
  set chipConfig(chipConfig: any) {
    if (chipConfig) {
      this._chipConfig = chipConfig;
      this.loadChipComponent(this._chipConfig);
    }
  }

  @Output('chipValueChange') chipValueChange = new EventEmitter<any>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadChipComponent(chipConfig) {
    console.log('Load Chip Component Event', chipConfig);
    const containerRef = this.insertionDirective.viewContainerRef;
    containerRef.clear();

    // Get the registered component details from the mapping object
    const mappingObject = FilterChipRegistry.get(chipConfig.filterChipId);

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        mappingObject.target
      );

    this.componentRef = containerRef.createComponent<unknown>(componentFactory);
    this.setPropsToDynamicComponent(chipConfig);
   
    if (this.componentRef.instance.onValueChange) {
      this.componentRef.instance.onValueChange
        .pipe(
          debounceTime(1200),
          distinctUntilChanged((prev: any, curr) => {
            return prev.value === curr.value;
          })
        )
        .subscribe(filterValue => {
            this.chipValueChange.emit({ chipConfig: chipConfig, chipValue: filterValue });
        });
    }
  }

  setPropsToDynamicComponent(chipConfig) {
    this.componentRef.instance.embeddedToParent = true;
    this.isRequired = chipConfig.isRequired;
    Object.entries(chipConfig?.filterProps).forEach(entry => {
      this.componentRef.instance[entry[0]] = entry[1];
    });
  }
}
