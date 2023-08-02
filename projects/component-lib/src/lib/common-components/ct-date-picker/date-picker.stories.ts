import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CtDatePickerComponent } from './ct-date-picker.component';
import { CtDatePickerModule } from './ct-date-picker.module';

import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  sub,
} from 'date-fns';

export default {
  title: 'Component/Common Components/Date Picker',
  component: CtDatePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [CtDatePickerModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const ranges: any = {
  Today: [new Date(), new Date()],
  Yesterday: [sub(new Date(), { days: 1 }), sub(new Date(), { days: 1 })],
  'Last 3 Days': [sub(new Date(), { days: 3 }), sub(new Date(), { days: 1 })],
  // 'Last 14 Days': [sub(new Date(), {days: 13}), new Date()],
  // 'Last 30 Days': [sub(new Date(), {days: 29}), new Date()],
  'This Week': [startOfWeek(new Date()), endOfWeek(new Date())],
  'Last Week': [
    startOfWeek(sub(new Date(), { weeks: 1 })),
    endOfWeek(sub(new Date(), { weeks: 1 })),
  ],
  'Last 2 Week': [
    startOfWeek(sub(new Date(), { weeks: 2 })),
    endOfWeek(sub(new Date(), { weeks: 1 })),
  ],

  'This Month': [startOfMonth(new Date()), endOfMonth(new Date())],

  'Last Month': [
    startOfMonth(sub(new Date(), { months: 1 })),
    endOfMonth(sub(new Date(), { months: 1 })),
  ],
  // 'Last 3 Month': [
  //   startOfMonth(sub(new Date(), {months: 3})),
  //   endOfMonth(sub(new Date(), {months: 1})),
  // ],
};

// Set default date range label
const defaultRangeLabel = 'This Week';

const TemplateDefault: Story = args => ({
  props: args,
  template: `<ct-date-picker 
                  [title]="title" 
                  [hint]="hint" 
                  [dateFormat]="dateFormat"
                  [isMaterial]="isMaterial"
                  [isDateRange]="isDateRange"
                  [rangeSeparator]="rangeSeparator"
                  [isError]="isError"
                  [placeholder]="placeholder"
                  >
              </ct-date-picker>`,
});

export const datePicker = TemplateDefault.bind({});
datePicker.args = {
  title: 'Date Picker',
  hint: 'Start Date - End Date',
  dateFormat: 'yyyy-MM-dd',
  isMaterial: true,
  rangeSeparator: '/',
  isDateRange: false,
  isError: false,
  placeholder: 'Input Placeholder',
};

const TemplateRangeDefault: Story = args => ({
  props: args,
  template: `<ct-date-picker 
                [title]="title" 
                [hint]="hint" 
                [dateFormat]="dateFormat"
                [isMaterial]="isMaterial"
                [rangeSeparator]="rangeSeparator"
                [isError]="isError"
                >
            </ct-date-picker>`,
});

export const dateRangePicker = TemplateRangeDefault.bind({});
dateRangePicker.args = {
  title: 'Date Picker',
  hint: 'Start Date - End Date',
  dateFormat: 'yyyy-MM-dd',
  isMaterial: false,
  rangeSeparator: '/',
  isError: false,
};

const TemplateWidget: Story = args => ({
  props: args,
  template: `<ct-date-picker 
                [title]="title" 
                [hint]="hint" 
                [ranges]="ranges"
                [dateFormat]="dateFormat"
                [isMaterial]="isMaterial"
                [rangeSeparator]="rangeSeparator"
                [isError]="isError"
               >
            </ct-date-picker>`,
});
export const singleCalendarWithWidgets = TemplateWidget.bind({});
singleCalendarWithWidgets.args = {
  title: 'Date Picker',
  hint: 'Start Date - End Date',
  ranges: ranges,
  dateFormat: 'yyyy-MM-dd',
  isMaterial: false,
  rangeSeparator: '/',
  isError: false,
};

const TemplateMultiCalendar: Story = args => ({
  props: args,
  template: `<ct-date-picker 
                    [title]="title" 
                    [hint]="hint" 
                    [ranges]="ranges"
                    [dateFormat]="dateFormat"
                    [isMaterial]="isMaterial"
                    [rangeSeparator]="rangeSeparator"
                    [withMultiCalendar]="withMultiCalendar"
                    [isError]="isError"
                 >
              </ct-date-picker>`,
});
export const multipleCalendarWithWidgets = TemplateMultiCalendar.bind({});
multipleCalendarWithWidgets.args = {
  title: 'Date Picker',
  hint: 'Start Date - End Date',
  ranges: ranges,
  dateFormat: 'yyyy-MM-dd',
  isMaterial: false,
  rangeSeparator: '/',
  withMultiCalendar: true,
  isError: false,
};

const TemplateMultiCalendarDisableDates: Story = args => ({
  props: args,
  template: `<ct-date-picker 
                    [title]="title" 
                    [hint]="hint" 
                    [ranges]="ranges"
                    [dateFormat]="dateFormat"
                    [disableDateSelection]="disableDateSelection"
                    [isMaterial]="isMaterial"
                    [rangeSeparator]="rangeSeparator"
                    [withMultiCalendar]="withMultiCalendar"
                    [isError]="isError"
                 >
              </ct-date-picker>`,
});
export const multipleCalendarWidgetsWithDisableDates =
  TemplateMultiCalendarDisableDates.bind({});
multipleCalendarWidgetsWithDisableDates.args = {
  title: 'Date Picker',
  hint: 'Start Date - End Date',
  ranges: ranges,
  dateFormat: 'yyyy-MM-dd',
  isMaterial: false,
  disableDateSelection: true, // It will enable or disable the date selection on range selection from widget
  rangeSeparator: '/',
  withMultiCalendar: true,
  isError: false,
};

const TemplateMultiCalendarWithDefaultWidgetSelected: Story = args => ({
  props: args,
  template: `<ct-date-picker 
                    [title]="title" 
                    [hint]="hint" 
                    [ranges]="ranges"
                    [dateFormat]="dateFormat"
                    [defaultRangeLabel]="defaultRangeLabel"
                    [isMaterial]="isMaterial"
                    [rangeSeparator]="rangeSeparator"
                    [withMultiCalendar]="withMultiCalendar"
                    [isError]="isError"
                 >
              </ct-date-picker>`,
});
export const multipleCalendarWithDefaultWidgetSelected =
  TemplateMultiCalendarWithDefaultWidgetSelected.bind({});
multipleCalendarWithDefaultWidgetSelected.args = {
  title: 'Date Picker',
  hint: 'Start Date - End Date',
  ranges: ranges,
  dateFormat: 'yyyy-MM-dd',
  isMaterial: false,
  defaultRangeLabel: defaultRangeLabel, // Sets default date label ex 'This Week', 'This Month'
  rangeSeparator: '/',
  withMultiCalendar: true,
  isError: false,
};
