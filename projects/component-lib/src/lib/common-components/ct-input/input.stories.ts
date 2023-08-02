import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtInputComponent } from './ct-input.component';
import { CtInputModule } from './ct-input.module';

export default {
  title: 'Component/Common Components',
  component: CtInputComponent,
  decorators: [
    moduleMetadata({
      imports: [CtInputModule, BrowserAnimationsModule, ReactiveFormsModule],
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
    inputVal: new FormControl('Default Value'),
  });

  return {
    component: CtInputComponent,
    template: `
          <form [formGroup]="form">
            <ct-input 
                [title]="title"
                [type]="inputType"
                [isError]="isError"
                [isMaterial]="isMaterial"
                formControlName="inputVal"
                >
            </ct-input>
          </form>
        `,
    props: {
      ...args,
      form: formGroup,
    },
  };
};
export const input = TemplateDefault.bind({});
input.args = {
  title: 'CT Input',
  isError: false,
  isMaterial: true,
};
