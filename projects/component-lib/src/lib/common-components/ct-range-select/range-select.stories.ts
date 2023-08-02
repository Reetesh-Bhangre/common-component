import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtRangeSelectComponent } from './ct-range-select.component';
import { CtRangeSelectModule } from './ct-range-select.module';

export default {
  title: 'Component/Common Components',
  component: CtRangeSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CtRangeSelectModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => {
  const formGroup = new FormGroup({
    rangeSelect: new FormControl([5, 10]),
  });

  return {
    component: CtRangeSelectComponent,
    template: `
          <form [formGroup]="form">
            <ct-range-select 
                [allowSwitch]="allowSwitch"
                [allowStepLabels]="allowStepLabels"
                [minRange]="minRange"
                [maxRange]="maxRange"
                [allowPushRange]="allowPushRange"
                [sliderSteps]="sliderSteps"
                formControlName="rangeSelect">
            </ct-range-select>
          </form>
        `,
    props: {
      ...args,
      form: formGroup,
    },
  };
};
export const rangeSelection = TemplateDefault.bind({});
rangeSelection.args = {
  allowSwitch: false,
  allowStepLabels: true,
  minRange: 1,
  maxRange: 24,
  allowPushRange: false,
  sliderSteps: [
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
  ],
};
