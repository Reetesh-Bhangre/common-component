import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'ct-range-select',
  templateUrl: './ct-range-select.component.html',
  styleUrls: ['./ct-range-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CtRangeSelectComponent),
      multi: true,
    },
  ],
})
export class CtRangeSelectComponent implements OnInit, ControlValueAccessor {
  //----- All Input Properties Listed Here -----//
  /** allowSwitch will allow user to Switch the slider handles */
  @Input() allowSwitch = false;
  /** allowStepLabels will show the labels on every steps of the slider */
  @Input() allowStepLabels = true;
  /** minRange will set the minimum difference of start and end Value of slider */
  @Input() minRange = 1;
  /** maxRange will set the maximum difference of start and end Value of slider */
  @Input() maxRange = 24;
  /** allowPushRange will allow us the push behavior of slider handles When the min handle goes above the max, the max is moved as well */
  @Input() allowPushRange = false;
  /** sliderSteps will define the sliders steps value in array format */
  @Input() sliderSteps: any[] = [
    { value: 0, legend: '12AM' },
    { value: 1, legend: '1AM' },
    { value: 2, legend: '2AM' },
    { value: 3, legend: '3AM' },
    { value: 4, legend: '4AM' },
    { value: 5, legend: '5AM' },
    { value: 6, legend: '6AM' },
    { value: 7, legend: '7AM' },
    { value: 8, legend: '8AM' },
    { value: 9, legend: '9AM' },
    { value: 10, legend: '10AM' },
    { value: 11, legend: '11AM' },
    { value: 12, legend: '12PM' },
    { value: 13, legend: '1PM' },
    { value: 14, legend: '2PM' },
    { value: 15, legend: '3PM' },
    { value: 16, legend: '4PM' },
    { value: 17, legend: '5PM' },
    { value: 18, legend: '6PM' },
    { value: 19, legend: '7PM' },
    { value: 20, legend: '8PM' },
    { value: 21, legend: '9PM' },
    { value: 22, legend: '10PM' },
    { value: 23, legend: '11PM' },
    { value: 24, legend: '12AM' },
  ];

  //----- All Output Properties Listed Here -----//
  /** Emitting the selected value from slider */
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  //----- All public variables are listed Here -----//
  /** Range Slider options */
  options: Options = {
    // step: 1, // The minimum range authorized on the slider
    noSwitching: !this.allowSwitch, // Set to true to only bind events on slider handles
    showTicks: this.allowStepLabels, // Set to true to display a tick and the step value for each step of the slider
    minRange: this.minRange, // The minimum range of the slider
    maxRange: this.maxRange, // The maximum range of the slider
    pushRange: this.allowPushRange, // Set to true to have a push behavior. When the min handle goes above the max, the max is moved as well
    stepsArray: [...this.sliderSteps], // sliders steps value
  };

  /** val is a initial value of ct-Select */
  public val: any[] = [];

  /** get the value used by the ngModel of the element */
  get value() {
    // if (this.singleSelectionMode && typeof this.val === 'string') {
    //   return null;
    // } else {
    return this.val;
    // }
  }

  /** sets the value used by the ngModel of the element */
  set value(val) {
    /** this value is updated by programmatic changes */
    if (val && val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouched(val);
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
  writeValue(value): void {
    if (value) {
      this.value = value;
    }
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn): void {
    this.onChange = fn; //;(this.value);
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn): void {
    this.onTouched = fn;
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState isDisabled', isDisabled);
    // throw new Error('Method not implemented.');
  }
  constructor() {
    // TODO
  }

  ngOnInit(): void {
    // TODO
  }

  /** function trigger when value is changed from the slider */
  onHighValueChange() {
    this.onValueChange.emit(this.val);
    this.onChange(this.val);
  }
}
