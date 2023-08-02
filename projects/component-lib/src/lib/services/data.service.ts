/** An Event emitter service that will allow event communication between
 * fronend application and library */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public $dateRangeReset = new BehaviorSubject(undefined);
  private prevSelectedRange: string;

  constructor() {}

  dateRangeReset(value: string) {
    this.$dateRangeReset.next(value);
  }

  setPrevSelectedRange(label: string) {
    this.prevSelectedRange = label;
  }
  getPrevSelectedRange() {
    return this.prevSelectedRange;
  }
}
