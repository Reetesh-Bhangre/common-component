export interface dateConfig {
  localeData(): InstanceLocaleDataReturn;
}
export interface InstanceLocaleDataReturn {
  firstDayOfWeek(): number;
  weekdays(instance?: dateConfig): string;
  weekdaysShort(instance?: dateConfig): string;
  weekdaysMin(instance?: dateConfig): string;
  months(instance?: dateConfig): string;
  monthsShort(instance?: dateConfig): string;
  longDateFormat(format: string): string;
  meridiem(hour?: number, minute?: number, isLower?: boolean): string;
  ordinal(n: number): string;
}

/* LocaleConfig Interface */
export interface LocaleConfig {
  direction?: string;
  separator?: string;
  weekLabel?: string;
  applyLabel?: string;
  cancelLabel?: string;
  clearLabel?: string;
  customRangeLabel?: string;
  daysOfWeek?: string[];
  monthNames?: string[];
  firstDay?: number;
  format?: string;
  displayFormat?: string;
}