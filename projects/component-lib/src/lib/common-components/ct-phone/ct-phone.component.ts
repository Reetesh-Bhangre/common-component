import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryISO } from './../../core/int-phone-component/enums/country-iso.enum';

import { SearchCountryField } from './../../core/int-phone-component/enums/search-country-field.enum';

@Component({
  selector: 'ct-phone',
  templateUrl: './ct-phone.component.html',
  styleUrls: ['./ct-phone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CtPhoneComponent),
      multi: true,
    },
  ],
})
export class CtPhoneComponent implements OnInit, ControlValueAccessor {
  // To set the class
  @Input() cssClass = 'custom';
  // title is the label of input area
  @Input() title = 'Title';
  // To set the preferred Countries on dropdown
  @Input() preferredCountries: CountryISO[] = [];
  // Toggle automatic country (flag) selection based on user input.
  @Input() enableAutoCountrySelect = true;
  // To set the search Country Field on dropdown
  @Input() searchCountryField = [SearchCountryField.All];
  // To set the default selected Country
  @Input() selectedCountry = CountryISO.UnitedStates; // US
  // To set the custom countries
  @Input() userCountriesList: CountryISO[] = [];
  // To set the material design
  @Input() isMaterial = true;
  //
  @Input() phoneType = ['Mobile', 'Work', 'Other'];
  //
  @Input() isError = false;

  /** val is a initial value of ct-phone-number */
  public val = {
    type: '',
    number: '',
    code: '',
  };

  /** get the value used by the ngModel of the element */
  get value() {
    return this.val;
  }

  /** sets the value used by the ngModel of the element */
  set value(val) {
    /** this value is updated by programmatic changes */
    if (val !== undefined && this.val !== val) {
      this.val = val;
      //   this.phoneNumber = this.val.number.split('-')[1];
      this.onChange(val);
      this.onTouched(val);
    }
  }

  /** function to register on UI change */
  onChange: any = () => {
    // TODO onChange
    // console.log('onchange', this.val);
  };

  /** function to register on element touch */
  onTouched: any = () => {
    // TODO onTouched
    // console.log('onTouched', this.val);
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
    console.log('CT Phone Constructor');
  }

  ngOnInit(): void {
    console.log('CT Phone Constructor');
  }
}
