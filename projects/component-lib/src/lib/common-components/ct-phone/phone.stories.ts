import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtPhoneComponent } from './ct-phone.component';
import { CtPhoneModule } from './ct-phone.module';

export default {
  title: 'Component/Common Components',
  component: CtPhoneComponent,
  decorators: [
    moduleMetadata({
      imports: [CtPhoneModule, BrowserAnimationsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [],
      entryComponents: [],
    }),
  ],
  argTypes: {
    inputType: {
      options: ['text', 'password'],
      control: { type: 'select' },
    },
  },
} as unknown as Meta;

// const inputTypes = ['text', 'password'];

const TemplateDefault: Story = args => {
  const formGroup = new FormGroup({
    inputVal: new FormControl({
      type: 'Work',
      number: '9012348765',
      code: '+91',
    }),
  });

  return {
    component: CtPhoneComponent,
    template: `
            <form [formGroup]="form">
                <ct-phone [cssClass]="cssClass" [isError]="isError" [selectedCountry]="selectedCountry" [isMaterial]="isMaterial" [phoneType]="phoneType" formControlName="inputVal"></ct-phone>
            </form>
        `,
    props: {
      ...args,
      form: formGroup,
    },
  };
};
export const phone = TemplateDefault.bind({});
phone.args = {
  cssClass: 'phone-input',
  selectedCountry: 'us',
  isMaterial: true,
  phoneType: ['Mobile', 'Work', 'Other'],
  isError: false,
};
