import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NgbPopover,
  NgbPopoverConfig,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { pad } from 'lodash';
import { noop } from 'rxjs';

// This will be added to another utility file
enum TimePlaceholder {
  '12hr_format_seconds' = '--:--:-- --',
  '12hr_format' = '--:-- --',
  '24hr_format_seconds' = '--:--:--',
  '24hr_format' = '--:--',
}

@Component({
  selector: 'ct-timepicker',
  templateUrl: './ct-timepicker.component.html',
  styleUrls: ['./ct-timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CtTimepickerComponent),
      multi: true,
    },
  ],
  host: {
    '(document:click)': 'offClick($event)',
  },
})
export class CtTimepickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  timeString: string;

  /** The number of hours to add/subtract when clicking hour spinners. */
  @Input()
  hourStep = 1;

  /**The number of minutes to add/subtract when clicking minute spinners. */
  @Input()
  minuteStep = 15;

  /**The number of seconds to add/subtract when clicking second spinners. */
  @Input()
  secondStep = 30;

  /**If true, it is possible to select seconds*/
  @Input()
  seconds = false;

  @Input()
  disabled = false;

  @Input()
  title = '';

  /** Whether to display 12H or 24H mode. */
  @Input()
  is12HrClock = false;

  /** */
  @Input() isError = false;
  //
  @Input() placeholder = '';

  /**
   * Set value from AbstractControl, like `ngModel` or `formControl`.
   * This will set the main value of the component.
   * @default null
   */
  @Input() set value(val) {
    if (val) {
      this.time = val;
      this.setTimeStringModel();
      this.onChange(val);
    } else {
      this.time = { hour: 0, minute: 0, second: 0 };
      this.timeString = '';
      this.onChange(this.timeString);
    }
  }

  /** get the value used by the ngModel of the element */
  get value() {
    return this.time;
  }

  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  withDarkTheme = false;

  maskTime: any[];
  @ViewChild('tp', { static: false }) tp: NgbPopover;

  timeMask = {
    '12hr_format_seconds': [
      /[0-2]/,
      /\d/,
      ':',
      /[0-5]/,
      /\d/,
      ':',
      /[0-5]/,
      /\d/,
      ' ',
      /[AaPp]/,
      /[Mm]/,
    ],
    '12hr_format': [/[0-2]/, /\d/, ':', /[0-5]/, /\d/, ' ', /[AaPp]/, /[Mm]/],
    '24hr_format_seconds': [
      /[0-2]/,
      /\d/,
      ':',
      /[0-5]/,
      /\d/,
      ':',
      /[0-5]/,
      /\d/,
    ],
    '24hr_format': [/[0-2]/, /\d/, ':', /[0-5]/, /\d/],
  };
  rawValue;
  timeSet: string[] = [];
  showTimeSet = false;
  @ViewChild('list') listEl!: ElementRef;

  timeSetValue: any;

  constructor(private config: NgbPopoverConfig, private _EREF: ElementRef) {
    config.autoClose = 'outside';
    config.placement = 'auto';
  }

  ngOnInit(): void {
    this.placeholder = this.placeholder === '' ? this.title : this.placeholder;
    this.setTimeMaskAndPlaceholder();
    if (this.value) {
      this.setTimeStringModel();
    }
    this.generateTimeSet();
  }

  manageDropDownScroll() {
    if (this.listEl) {
      const selectedItemIndex = this.timeSet.indexOf(this.timeString);
      if (selectedItemIndex !== -1) {
        this.listEl.nativeElement.children[0].scrollTop =
          selectedItemIndex * 33;
      } else {
        const timeObj = this.fromTimeStringToObject(this.timeString);
        const timeDiff = [];
        const times = [...this.timeSet];
        times.sort((a, b) => {
          return a.indexOf('PM');
        });
        times.filter(time => {
          const _meridianPosition = time.indexOf('AM') > -1 ? 'AM' : 'PM';
          let _time = parseInt(time);
          if (this.is12HrClock) {
            if (_meridianPosition === 'PM' && _time !== 12) {
              _time += 12;
            } else if (_meridianPosition === 'AM' && _time === 12) {
              _time = 0;
            }
          }
          const k = Math.abs(timeObj.hour - _time);
          timeDiff.push({ hour: time, diff: k });
        });
        timeDiff.sort((a, b) => {
          return b.diff - a.diff;
        });
        const closestTime = timeDiff[timeDiff.length - 1].hour;
        const selectedItemIndex = this.timeSet.indexOf(closestTime);
        this.listEl.nativeElement.children[0].scrollTop =
          selectedItemIndex * 33;
      }
    }
  }

  convTimeInMinutes(timeString: string) {
    const obj = this.fromTimeStringToObject(timeString);
    return Number(Number(obj.hour) * 60) + Number(obj.minute);
  }

  inputClick() {
    setTimeout(() => {
      this.manageDropDownScroll();
    }, 250);
    this.showTimeSet = true;
    this.timeSetValue = [this.timeString];
  }

  generateTimeSet() {
    const x = this.minuteStep; //minutes interval
    let times = []; // time array
    let tt = 0; // start time
    if (this.is12HrClock) {
      const ap = [' AM', ' PM']; // AM-PM
      //loop to increment the time and push results in array
      for (let i = 0; tt < 24 * 60; i++) {
        const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        const mm = tt % 60; // getting minutes of the hour in 0-55 format
        times[i] =
          ('0' + (hh % 12)).slice(-2) +
          ':' +
          ('0' + mm).slice(-2) +
          ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
      }
      times = times.map(timeValue => {
        if (timeValue.includes(' PM') && timeValue.includes('00:')) {
          return timeValue.replaceAll('00:', '12:');
        } else {
          return timeValue;
        }
      });
    } else {
      for (let i = 0; tt < 24 * 60; i++) {
        const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        const mm = tt % 60; // getting minutes of the hour in 0-55 format
        times[i] = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2);
        tt = tt + x;
      }
    }
    this.timeSet = times;
  }

  onTimeSetChange(event) {
    if (event[0]) {
      this.timeString = event[0];
      const obj = this.fromTimeStringToObject(this.timeString);
      this.onChange(obj);
    }
  }

  /*
   Event on change in time from picker 
  */
  onTimePickerChange(event: NgbTimeStruct) {
    this.onChange(event);
    if (event) {
      if (event.hour !== null) {
        this.time.hour = event.hour;
      }
      if (event.minute !== null) {
        this.time.minute = event.minute;
      }
      if (event.second !== null) {
        this.time.second = event.second;
      }
      this.setTimeStringModel();
    }
  }

  /**  Sets time string for input element to show */
  setTimeStringModel() {
    if (!this.time.hour) {
      this.time.hour = 0;
    }
    if (!this.time.minute) {
      this.time.minute = 0;
    }
    if (!this.time.second) {
      this.time.second = 0;
    }
    const hour = this.time.hour.toString().padStart(2, '0');
    const minute = this.time.minute.toString().padStart(2, '0');
    const second = this.time.second.toString().padStart(2, '0');
    let convTimeString: string;
    if (this.is12HrClock) {
      const isPm = this.time.hour > 12;
      let hour = isPm ? Number(this.time.hour) - 12 : this.time.hour;
      if (hour === 0) {
        hour = 12;
      }
      const hourString = hour.toString().padStart(2, '0');
      convTimeString = `${hourString}:${pad(minute)}${
        this.seconds ? `:${pad(second)}` : ''
      } ${isPm ? 'PM' : 'AM'}`;
    } else {
      convTimeString = `${pad(hour)}:${pad(minute)}${
        this.seconds ? `:${pad(second)}` : ''
      }`;
    }

    this.timeString = convTimeString;
    this.rawValue = this.timeString;
    return convTimeString;
  }

  /** 
   Event on time change from input element
  */
  onInputChange(value: string) {
    this.rawValue = value;
    if (value) {
      if (value.indexOf('_') == -1) {
        const timeModel = this.fromTimeStringToObject(value);
        if (timeModel) {
          this.time = timeModel;
          this.setTimeStringModel();
          this.onChange(this.time);
        } else if (value?.trim() === '') {
          this.time = { hour: 0, minute: 0, second: 0 };
          this.timeString = '';
          this.onChange(this.timeString);
        } else {
          this.onChange(value);
        }
        if (this.timeSet.indexOf(value) !== -1) {
          this.timeSetValue = [value];
        } else {
          this.timeSetValue = [];
        }
        this.manageDropDownScroll();
      }
    }
  }

  private parse12HrFormatString(timeString: string) {
    const time = timeString?.split(' ');
    return {
      time: time[0],
      timeParts: time[0]?.split(':'),
      meridianAbbr: time[1]?.toLowerCase(),
    };
  }

  /**
   * Converts time string to time picker supported object
   * @param timeString
   * @returns time picker supported model
   */
  fromTimeStringToObject(timeString: string): NgbTimeStruct {
    if (timeString) {
      let timeObj: NgbTimeStruct;
      if (this.is12HrClock) {
        const parsedTime = this.parse12HrFormatString(timeString);
        let hour: number;
        if (parsedTime.meridianAbbr == 'pm') {
          hour = Number(parsedTime.timeParts[0]) + 12;
        } else {
          hour = Number(parsedTime.timeParts[0]);
        }
        if (hour === 12 && parsedTime.meridianAbbr == 'am') {
          hour = 0;
        }
        timeObj = {
          hour: hour,
          minute: parsedTime.timeParts[1] ? Number(parsedTime.timeParts[1]) : 0,
          second: parsedTime.timeParts[2] ? Number(parsedTime.timeParts[2]) : 0,
        };
      } else {
        const timeUnits = timeString.split(':');
        timeObj = {
          hour: timeUnits[0] ? Number(timeUnits[0]) : 0,
          minute: timeUnits[1] ? Number(timeUnits[1]) : 0,
          second: timeUnits[2] ? Number(timeUnits[2]) : 0,
        };
      }
      return timeObj;
    }
  }

  /**
   * Set Time input elements mask and placeholder depending on 12hr and 24hr format
   */
  setTimeMaskAndPlaceholder() {
    if (this.is12HrClock) {
      (this.placeholder = this.seconds
        ? TimePlaceholder['12hr_format_seconds']
        : TimePlaceholder['12hr_format']),
        (this.maskTime = this.seconds
          ? this.timeMask['12hr_format_seconds']
          : this.timeMask['12hr_format']);
    } else {
      this.placeholder = this.seconds
        ? TimePlaceholder['24hr_format_seconds']
        : TimePlaceholder['24hr_format'];
      this.maskTime = this.seconds
        ? this.timeMask['24hr_format_seconds']
        : this.timeMask['24hr_format'];
    }
  }

  /**
   * Handle scenarios for outside click with incomplete time
   */
  clickOutside() {
    if (!this.tp) {
      if (this.rawValue?.indexOf('_') != -1) {
        if (!this.is12HrClock) {
          this.timeString = this.rawValue.replaceAll('_', '0');
        } else {
          const parsedTime = this.parse12HrFormatString(this.rawValue);
          let parsedTimePart = parsedTime.time.replaceAll('_', '0');
          if (parsedTimePart.slice(0, 2) == '00') {
            parsedTimePart = '12' + parsedTimePart.slice(2);
          }
          if (parsedTime.meridianAbbr.indexOf('_') != -1) {
            this.timeString = parsedTimePart + ' AM';
          } else {
            const ampm = parsedTime.meridianAbbr.toUpperCase();
            this.timeString = parsedTimePart + ' ' + ampm;
          }
        }
      } else {
        if (this.rawValue?.length == 0) {
          this.setDefaultTime();
        }
      }
      this.time = this.fromTimeStringToObject(this.timeString);
    }
  }

  /**
   * Set default time
   */
  private setDefaultTime() {
    if (this.is12HrClock) {
      this.timeString = this.seconds ? '12:00:00 AM' : '12:00 AM';
    } else {
      this.timeString = this.seconds ? '00:00:00' : '00:00';
    }
  }

  private onChange: (_: any) => void = noop;
  private onTouched: () => void = noop;

  writeValue(value: NgbTimeStruct) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * (Optional)
   * the method will be called by the control when the [disabled] state changes.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Function to Close the dropdown If we are clicking the outside of component */
  offClick(event) {
    if (!this._EREF.nativeElement.contains(event.target)) {
      this.clickOutsideTimePicker(event);
    }
  }

  /** Function to Close and cancel the dropdown on Out Side Click */
  clickOutsideTimePicker(event: any) {
    if (this.showTimeSet && !this.clickIsInsideTimePicker(event.target)) {
      this.showTimeSet = false;
    }
  }

  public clickIsInsideTimePicker(target) {
    return this.listEl && this.listEl.nativeElement.contains(target);
  }
}
