import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { format } from 'date-fns';
import { DaterangepickerDirective } from '../../core/daterangepicker/daterangepicker.directive';
import { FilterChip } from '../ct-filter-chip/ct-filter-chip.component';

const MY_FORMATS = {
  parse: {
    dateInput: 'EEE, MMM dd, yyyy',
  },
  display: {
    dateInput: 'EEE, MMM dd, yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM yyyy',
  },
};

@FilterChip({
  id: 'ctDatepicker',
})
@Component({
  selector: 'ct-date-picker',
  templateUrl: './ct-date-picker.component.html',
  styleUrls: ['./ct-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CtDatePickerComponent),
      multi: true,
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CtDatePickerComponent implements OnInit, ControlValueAccessor {
  /** All Input Properties Listed Here */
  // title is a title of component
  @Input() title = 'Date Range Picker';
  // hint is the simple text will be appear at the bottom of component
  @Input() hint = 'Start Date - End Date';
  // dateFormat is to get and emit the dateFormat
  @Input() dateFormat = 'yyyy-MM-dd';
  // rangeSeparator between the startDate and endDate
  @Input() rangeSeparator = '/';
  // isMaterial flag is used to see custom date picker OR angular material date Picker
  @Input() isMaterial = false;
  // isDateRange flag is true to select the date in range, False if select a single date
  @Input() isDateRange = true;
  // appearance will provide us the form field design
  @Input() fieldAppearance: MatFormFieldAppearance = 'standard'; // 'legacy', 'standard', 'fill', 'outline'
  // dropDownXPosition will help to set the position of calendar dropdown relative to x-axis
  @Input() dropDownXPosition = 'right'; // left, center, right
  // dropDownYPosition will help to set the position of calendar dropdown relative to x-axis
  @Input() dropDownYPosition = 'down'; // up, down
  // withDarkTheme
  @Input() withDarkTheme = false;

  @Input() ranges: any;

  @Input() timePicker = false;

  @Input() withMultiCalendar = false;

  @Input() localeConfig = { format: 'EEE, MMM dd, yyyy', applyLabel: 'Ok' };
  @Input() isError = false;

  @Input() placeholder = '';

  public _minDate: any;
  public _maxDate: any = undefined;
  public _defaultRangeLabel = 'Custom range';

  @Input()
  get defaultRangeLabel() {
    return this._defaultRangeLabel;
  }
  set defaultRangeLabel(value) {
    if (value) {
      this._defaultRangeLabel = value;
    }
  }

  @Input() disableDateSelection = false;

  @Input()
  get minDate() {
    return this._minDate;
  }

  set minDate(val: any) {
    if (val) {
      if (this.disableDateSelection) {
        this._minDate = val;
      } else {
        this._minDate = null;
      }
    }
  }

  @Input()
  get maxDate() {
    return this._maxDate;
  }

  set maxDate(val: any) {
    if (val) {
      if (this.disableDateSelection) {
        this._maxDate = val;
      } else {
        this._maxDate = null;
      }
    }
  }

  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @ViewChild('ctDatePickerModel') datePickerModel!: any;

  private _embeddedToParent = false;

  @Input() set embeddedToParent(value) {
    this._embeddedToParent = value;
  }

  get embeddedToParent() {
    return this._embeddedToParent;
  }

  alwaysShowCalendars = true;
  showRangeLabelOnInput = true;
  keepCalendarOpeningWithRange = true;

  /** All ViewChild Properties Listed Here */
  // DaterangepickerDirective will help to get some internal event of ngx-date-Range-Picker
  @ViewChild(DaterangepickerDirective, { static: false })
  customDatePicker: DaterangepickerDirective;

  /** All public variables are listed Here */
  // val is a initial value of date picker
  public val: any;
  // startValue contains the start date value of date picker
  public startValue = '';
  // endValue contains the end date value of date picker
  public endValue = '';
  // Custom date picker supper date in object format
  public selectedRange = {
    startDate: null,
    endDate: null,
  };
  /** */
  public autoApply = false;

  // get the value used by the ngModel of the element
  get value() {
    // combining the start date and end date and assign to val
    if (this.isMaterial) {
      if (this.isDateRange) {
        this.val = this.startValue + '/' + this.endValue;
      }
      return this.val;
    } else {
      return this.val;
    }
  }

  // sets the value used by the ngModel of the element
  set value(val) {
    if (val && val !== undefined) {
      if (this.isMaterial) {
        if (this.isDateRange) {
          this.val = val;
          const valueArray = val.split(this.rangeSeparator);
          this.startValue = valueArray[0];
          this.endValue = valueArray[1];
        } else {
          this.val = val;
        }
        if (
          typeof this.onChange === 'function' &&
          typeof this.onTouched === 'function'
        ) {
          this.onChange(val);
          this.onTouched(val);
        }
      } else {
        this.val = val;
        if (this.val.startDate && this.val.endDate && this.isDateRange) {
          const date =
          format(new Date(this.val.startDate),this.dateFormat) +
          this.rangeSeparator +
          format(new Date(this.val.endDate),this.dateFormat);
          this.onChange(date);
        } else {
          this.onChange(this.val);
        }
      }
    }
  }

  // function to register on UI change
  onChange: any = (value) => {
    this.updateValueToParent(value);
    // TODO onChange
  };
  // function to register on element touch
  onTouched: any = () => {
    // TODO onTouched
  };

  // This will write the value to the view if the the value changes occur on the model programmatically
  writeValue(value): void {
    if (this.isMaterial) {
      this.value = value;
    } else {
      if (this.isDateRange && value && typeof value === 'string') {
        this.selectedRange.startDate = new Date(
          value.split(this.rangeSeparator)[0]
        );
        this.selectedRange.endDate = new Date(
          value.split(this.rangeSeparator)[0]
        );
        this.value = this.selectedRange;
      } else {
        if (value && typeof value === 'string') {
          this.selectedRange.startDate = new Date(
            value.split(this.rangeSeparator)[0]
          );
          this.selectedRange.endDate = new Date(
            value.split(this.rangeSeparator)[0]
          );
          this.value = this.selectedRange;
        }
      }
    }
  }

  // When the value in the UI is changed, this method will invoke a callback function
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  // When the element is touched, this method will get called
  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  // When the element is disabled state, this method will get called
  setDisabledState?(): void {
    // TODO for setDisabledState
  }

  constructor(private cdr: ChangeDetectorRef) {
    // TODO constructor
  }

  ngOnInit(): void {
    this.placeholder = this.placeholder === '' ? this.title : this.placeholder;
  }

  // Angular Material Event will trigger on Date change from UI
  addEvent() {
    const date =
      format(new Date(this.startValue),this.dateFormat) +
      this.rangeSeparator +
      format(new Date(this.endValue),this.dateFormat) ;
    if (typeof this.onChange === 'function') {
      this.onChange(date);
    }
  }

  // Custom Date Picker event will trigger on Date change from UI
  datesUpdated(event) {
    if (
      event.startDate &&
      event.endDate &&
      typeof this.onChange === 'function'
    ) {
      if (this.isDateRange) {
        const date = format(new Date(event.startDate),this.dateFormat) + this.rangeSeparator + format(new Date(event.endDate),this.dateFormat);
        this.onChange(date);
      } else {
        const date = format(new Date(event.startDate),this.dateFormat);
        this.onChange(date);
      }
    }
  }

  // openCalendar will open the calender on calendar icon click
  openCalendar() {
    this.customDatePicker.open();
  }

  rangeClicked($event) {
    this.minDate = $event.dates[0];
    this.maxDate = $event.dates[1];
    this.cdr.detectChanges();
  }

  updateValueToParent(value) {
    // If embedded to parent then return the response object
    if (this.embeddedToParent) {
      let dateControl: any;
      if (this.datePickerModel) {
        dateControl = this.datePickerModel;
      }

      this.onValueChange.emit({
        value,
        status: dateControl?.control?.status,
        errors: dateControl?.control?.errors,
      });
    }
  }
}
