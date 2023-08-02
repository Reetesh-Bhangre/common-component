import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ct-toggle',
  templateUrl: './ct-toggle.component.html',
  styleUrls: ['./ct-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CtToggleComponent),
      multi: true,
    },
  ],
})
export class CtToggleComponent implements OnInit, ControlValueAccessor {
  /** Disable current toggle button. User can't interact with this component */
  @Input() disabled = false;
  /** offText will help to show the text when toggle button is Off */
  @Input() offText = 'No';
  /** onText will help to show the text when toggle button is On */
  @Input() onText = 'Yes';
  /** isMaterial will set the element Material behavior */
  @Input() isMaterial = false;
  /** onToggleChange event will emit when toggle change*/
  @Output() readonly onToggleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  //----- All public variables are listed Here -----//
  /** val is a initial value of toggle */
  public val;

  /** get the value used by the ngModel of the element */
  get value() {
    return this.val;
  }

  /** sets the value used by the ngModel of the element */
  set value(val) {
    /** this value is updated by programmatic changes */
    if (val !== undefined && this.val !== val) {
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
    this.value = value;
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
    this.disabled = isDisabled;
    // throw new Error('Method not implemented.');
  }

  constructor() {
    // TODO
  }

  ngOnInit(): void {
    // TODO
  }

  changeToggleVal() {
    this.onTouched();
    this.onChange(this.value);
    this.onToggleChange.emit(this.value);
  }
}
