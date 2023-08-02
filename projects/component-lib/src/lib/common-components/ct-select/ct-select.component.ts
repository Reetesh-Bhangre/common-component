import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from './../../core/select/ng-select.component';
import { FilterChip } from '../ct-filter-chip/ct-filter-chip.component';

@FilterChip({
  id: 'ctSelect',
})
@Component({
  selector: 'ct-select',
  templateUrl: './ct-select.component.html',
  styleUrls: ['./ct-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CtSelectComponent),
    },
  ],
})
export class CtSelectComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  private _selectorList: any;
  private _embeddedToParent: boolean;
  
  public maxItemToShow = 2;
  //----- All Input Properties Listed Here -----//
  /** title is a title of component */
  @Input() title = 'Select';
  /** selectorList is a set of dropdown data from we can select the records */
  //   @Input() selectorList: any[] = [];
  @Input() set selectorList(value: any) {
    if (value) {
      this._selectorList = value;
    }
  }
  get selectorList() {
    return this._selectorList;
  }
  /** titleProperty of an object which we want to show as a label in a select box. */
  @Input() visibleProperty = 'name';
  /** */
  @Input() isMaterial = false;
  /** singleSelectionMode can be selected by setting true or false */
  @Input() singleSelectionMode = false;
  /** allowSearch is Enable or disable search feature */
  @Input() allowSearch = true;
  /** allowClear is to add or remove cross icon to clear selected value */
  @Input() allowClear = true;
  /** If singleSelectionMode is false so multiSelect is true we can limit maximum items available to select. */
  @Input() multiSelectionLimit = 4;
  // appearance will provide us the form field design
  @Input() fieldAppearance = 'standard'; // 'legacy', 'standard', 'fill', 'outline'
  // appendTo
  @Input() appendTo: string;
  // withDarkTheme
  @Input() withDarkTheme = false;
  // input Placeholder
  @Input() placeholder = '';
  // isError will put the component in error state
  @Input() isError = false;
  // clearSearchOnAdd will clear the input text value after selection
  @Input() clearSearchOnAdd = true;

  @Input() locale = {
    direction: 'ltr', // could be rtl
    selectAllLabel: 'Select All', // detault is 'Select All'
    itemsSelectedLabel: 'items are selected...', // detault is 'items are selected...'
  };

  @Input() set embeddedToParent(value) {
    this._embeddedToParent = value;
  }
  get embeddedToParent() {
    return this._embeddedToParent;
  }

  @Output('onValueChange') onValueChange = new EventEmitter<any>();

  @Output('selectionChange') selectionChange = new EventEmitter();

  //----- All ViewChild Properties Listed Here -----//
  @ViewChild('ctSingleSelect') ctSingleSelectEl: NgSelectComponent;
  @ViewChild('ctMultiSelect') ctMultiSelectEl: NgSelectComponent;
  @ViewChild('ctSelectModel') selectModel!: any;

  //----- All public variables are listed Here -----//
  /** val is a initial value of ct-Select */
  public val: any[] = [];
  /** dropDownList will contain the dropdown Items */
  public dropDownList: any[] = [];
  /** lastSelectedItem will contain the last selected item */
  public lastSelectedItem;
  /** */
  public selectedItem = '';

  /** get the value used by the ngModel of the element */
  get value() {
    if (this.singleSelectionMode && typeof this.val === 'string') {
      return null;
    } else {
      return this.val;
    }
  }

  /** sets the value used by the ngModel of the element */
  set value(val) {
    /** this value is updated by programmatic changes */
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.createSelectedItemString(this.val);
    }
  }

  /** function to register on UI change */
  onChange: any = () => {
    // TODO onChange
  };

  /** function to register on element touch */
  onTouched: any = () => {
    // TODO onTouched
  };

  /** This will write the value to the view if the the value changes occur on the model programmatically */
  writeValue(value): void {
    this.value = value;
  }

  /** When the value in the UI is changed, this method will invoke a callback function */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** When the element is touched, this method will get called */
  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  /** When the element is disabled state, this method will get called */
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState isDisabled', isDisabled);
  }

  constructor() {
    // TODO constructor
  }

  ngOnInit(): void {
    this.placeholder = this.title === '' ? this.placeholder : '';
    this.dropDownList = [...this.selectorList];
    if(!this._embeddedToParent){
      this.maxItemToShow = 3;
    }
    this.selectAllForDropdownItems(this.selectorList);
  }

  ngAfterViewInit(): void {
    this.lastSelectedItem = this.val;
    this.updateValueToParent(this.value);
  }

  selectAllForDropdownItems(items: any[]) {
    const allSelect = items => {
      items.forEach(element => {
        element['selectedAllGroup'] = 'selectedAllGroup';
      });
    };

    allSelect(items);
  }

  onApply() {
    console.log('Apply and close the popup');
    if (typeof this.onChange === 'function') {
      this.lastSelectedItem = this.val;
      this.onChange(this.val);
      this.updateValueToParent(this.value);
    } else {
      this.lastSelectedItem = this.val;
    }
    this.ctSingleSelectEl.close();
  }

  onCancel() {
    console.log('cancel and close the popup');
    if (typeof this.onChange === 'function') {
      this.val = this.lastSelectedItem;
      this.onChange(this.val);
      this.updateValueToParent(this.value);
    } else {
      this.val = this.lastSelectedItem;
    }
    this.ctSingleSelectEl.close();
  }

  onSelectionChange() {
    if (typeof this.onChange === 'function') {
      this.lastSelectedItem = this.val;
      this.onChange(this.val);
      this.selectionChange.emit(this.val);
      this.updateValueToParent(this.value);
    } else {
      this.lastSelectedItem = this.val;
    }
  }

  createSelectedItemString(item: any) {
    if (item && item.length > 2) {
      const selectedValue = item.map(value => {
        return value.name;
      });
      this.selectedItem = selectedValue.join(', ');
    }
  }

  onDropDownOpen() {
    // code to maintain the dropdown position while all items are selected
    if (!this.singleSelectionMode) {
      setTimeout(() => {
        if (this.ctMultiSelectEl && this.ctMultiSelectEl.dropdownPanel) {
          this.ctMultiSelectEl.dropdownPanel.scrollElementRef.nativeElement.scrollTop = 0;
        }
      }, 0);
    }
  }

  updateValueToParent(value) {
    // If embedded to parent then return the response object
    if (this.embeddedToParent) {
      let selectControl: any;
      if (this.selectModel) {
        selectControl = this.selectModel;
      }

      this.onValueChange.emit({
        value,
        status: selectControl?.control?.status,
        errors: selectControl?.control?.errors,
      });
    }
  }
}
