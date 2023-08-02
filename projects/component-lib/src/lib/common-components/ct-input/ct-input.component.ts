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
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FilterChip } from '../ct-filter-chip/ct-filter-chip.component';

@FilterChip({
  id: 'ctInput',
})
@Component({
  selector: 'ct-input',
  templateUrl: './ct-input.component.html',
  styleUrls: ['./ct-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CtInputComponent),
      multi: true,
    },
  ],
})
export class CtInputComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  private _embeddedToParent = false;
  //----- All Input Properties Listed Here -----//
  /** title is the label of input area */
  @Input() title = 'Title';
  /** type */
  @Input() type = 'text';
  // appearance will provide us the form field design
  @Input() fieldAppearance: MatFormFieldAppearance = 'standard'; // 'legacy', 'standard', 'fill', 'outline'
  // isMaterial flag is used to see custom date picker OR angular material date Picker
  @Input() isMaterial = false;
  // withDarkTheme
  @Input() withDarkTheme = false;
  //
  @Input() isError = false;
  //
  @Input() placeholder = '';

  @Input() set embeddedToParent(value) {
    this._embeddedToParent = value;
  }

  get embeddedToParent() {
    return this._embeddedToParent;
  }

  @Output('onValueChange') onValueChange = new EventEmitter<any>();

  @ViewChild('ctInputModel') inputModel!: any;

  //----- All public variables are listed Here -----//
  /** val is a initial value of ct-Select */
  public val = '';

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
    console.log('setDisabledState isDisabled', isDisabled);
    // throw new Error('Method not implemented.');
  }

  constructor() {
    // TODO
  }

  ngOnInit(): void {
    this.placeholder = this.placeholder === '' ? this.title : this.placeholder;
  }

  ngAfterViewInit() {
    this.updateValueToParent(this.value);
  }

  updateValueToParent(value) {
    // If embedded to parent then return the response object
    if (this.embeddedToParent) {
      let inputControl: any;
      if (this.inputModel) {
        inputControl = this.inputModel;
      }

      this.onValueChange.emit({
        value,
        status: inputControl.control.status,
        errors: inputControl.control.errors,
      });
    }
  }

  onFocusout(event) {
    if (this.embeddedToParent) {
      this.updateValueToParent(event.target.value);
    }
  }
}
