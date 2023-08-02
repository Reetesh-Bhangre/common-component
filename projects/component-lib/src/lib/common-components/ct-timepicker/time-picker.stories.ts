import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtTimepickerComponent } from './ct-timepicker.component';
import { CtTimepickerModule } from './ct-timepicker.module';

export default {
  title: 'Component/Common Components/Time Picker',
  component: CtTimepickerComponent,
  decorators: [
    moduleMetadata({
      imports: [CtTimepickerModule, BrowserAnimationsModule],
    }),
  ],
} as unknown as Meta;

const Template: Story = args => ({
  props: args,
  template: `<ct-timepicker [disabled]="disabled" [isError]="isError" [value]="value" [is12HrClock]="is12HrClock" [seconds]="seconds" [title]="title" [minuteStep]="minuteStep" >
            </ct-timepicker>`,
});
export const basicUsage = Template.bind({});
basicUsage.args = {
  title: 'Start Time',
  value: {
    hour: 11,
    minute: 12,
    second: 13,
  },
  minuteStep: 15,
  isError: false,
  // TODO: Remove Later
  // hourStep: 1,
  //secondStep: 30
};

export const disabled = Template.bind({});
disabled.args = {
  title: 'Start Time',
  disabled: true,
  value: {
    hour: 11,
    minute: 12,
    second: 13,
  },
  minuteStep: 15,
  isError: false,
  // hourStep: 1,
  // secondStep: 30
};

export const format12Hr = Template.bind({});
format12Hr.args = {
  title: 'Start Time',
  is12HrClock: true,
  seconds: false,
  value: {
    hour: 2,
    minute: 15,
  },
  minuteStep: 15,
  isError: false,
  // hourStep: 1,
  // secondStep: 30
};

export const format12HrWithSeconds = Template.bind({});
format12HrWithSeconds.args = {
  title: 'Start Time',
  is12HrClock: true,
  seconds: true,
  value: {
    hour: 11,
    minute: 12,
    second: 20,
  },
  minuteStep: 15,
  isError: false,
  // hourStep: 1,
  // secondStep: 30
};

export const format24Hr = Template.bind({});
format24Hr.args = {
  title: 'Start Time',
  seconds: false,
  value: {
    hour: 22,
    minute: 12,
  },
  minuteStep: 15,
  isError: false,
  // hourStep: 1,
  // secondStep: 30
};

export const format24HrWithSeconds = Template.bind({});
format24HrWithSeconds.args = {
  title: 'Start Time',
  seconds: true,
  value: {
    hour: 22,
    minute: 12,
    second: 20,
  },
  minuteStep: 15,
  isError: false,
  // hourStep: 1,
  // secondStep: 30
};
