import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ct-checkbox',
  templateUrl: './ct-checkbox.component.html',
  styleUrls: ['./ct-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CtCheckboxComponent),
      multi: true,
    },
  ],
})
export class CtCheckboxComponent implements ControlValueAccessor {
  /** Text of the checkbox. Will be placed near checkbox */
  @Input() labelText!: string;

  /** Disable current checkbox. User can't interact with this component */
  @Input() disabled = false;

  /** Set value from AbstractControl */
  @Input() set value(val: boolean) {
    this.checked = val;
    this.onChange(this.checked);
  }

  /** Checkbox state value. Can be true or false */
  checked = false;

  public isLabelLeft!: boolean;
  public isRequired!: boolean;

  @Input()
  get labelLeft() {
    return this.isLabelLeft;
  }
  set labelLeft(value) {
    this.isLabelLeft = value;
  }

  // TODO: Implement is required feature in UI
  // @Input()
  // get required() {
  //   return this.isRequired;
  // }
  // set required(value) {
  //   this.isRequired = value;
  // }

  /**
   * Output event with checkbox state.
   * Use it when a checkbox isn't a part of the form or not used as `ngModel`.
   */
  @Output() readonly isCheckedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Catching changes in the checkbox and updating control.
   */
  changeModelVal(): void {
    this.onTouched();
    this.onChange(this.checked);
    this.isCheckedChange.emit(this.checked);
  }

  /**
   * @ignore
   */
  private onTouched = () => {
    // nothing to do
  };

  /**
 * @ignore
 */
  private onChange: (value: any) => void = () => {
    // nothing to do
  };

  /**
   * Register touch action
   */
  onBlur(): void {
    this.onTouched();
  }

  /**
   * Calls this function with new value. When user wrote something in the component
   * It needs to know that new data has been entered in the control.
   */
  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }

  /**
   * Calls this function when user left chosen component.
   * It needs for validation
   */
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  /**
   * (Optional)
   * the method will be called by the control when the [disabled] state changes.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * this method will be called by the control to pass the value to our component.
   * It is used if the value is changed through the code outside
   * (setValue or changing the variable that ngModel is tied to),
   * as well as to set the initial value.
   */
  writeValue(obj: any): void {
    this.checked = obj;
  }
}
