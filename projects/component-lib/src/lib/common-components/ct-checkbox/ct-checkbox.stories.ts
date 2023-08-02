import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtCheckboxModule } from './ct-checkbox.module';
import { CtCheckboxComponent } from './ct-checkbox.component';

export default {
  title: 'Component/Common Components/CheckBox',
  component: CtCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CtCheckboxModule, BrowserAnimationsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [],
      entryComponents: [],
    }),
  ],
  argTypes: {
    labelText: 'is Allowed',
    disabled: false,

  },
} as unknown as Meta;

const TemplateDefault: Story = args => {
  const formGroup = new FormGroup({
    checkBoxVal: new FormControl(true),
  });

  return {
    component: CtCheckboxComponent,
    template: `
          <form [formGroup]="form">
            <ct-checkbox
                [labelText]="labelText"
                [disabled]="disabled"
                [labelLeft]="labelLeft"
                formControlName="checkBoxVal"
                >
            </ct-checkbox>
          </form>
        `,
    props: {
      ...args,
      form: formGroup,
    },
  };
};
export const basicUsage = TemplateDefault.bind({});
basicUsage.args = {
  labelText: 'Checkbox',
  disabled: false,
  labelLeft: true
};

export const disabled = TemplateDefault.bind({});
disabled.args = {
  labelText: 'Checkbox',
  disabled: true,
  labelLeft: true
};

export const labelPosition = TemplateDefault.bind({});
labelPosition.args = {
  labelText: 'Checkbox',
  disabled: false,
  labelLeft: false
};

