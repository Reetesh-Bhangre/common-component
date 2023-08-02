import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtToggleComponent } from './ct-toggle.component';
import { CtToggleModule } from './ct-toggle.module';

export default {
  title: 'Component/Common Components',
  component: CtToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [CtToggleModule, BrowserAnimationsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => {
  const formGroup = new FormGroup({
    toggleValue: new FormControl(true),
  });

  return {
    component: CtToggleComponent,
    template: `
          <form [formGroup]="form">
            <ct-toggle [disabled]="disabled" [isMaterial]="isMaterial" formControlName="toggleValue" [onText]="onText" [offText]="offText"></ct-toggle>
          </form>
        `,
    props: {
      ...args,
      form: formGroup,
    },
  };
};
export const toggle = TemplateDefault.bind({});
toggle.args = {
  disabled: false,
  onText: 'On',
  offText: 'Off',
  isMaterial: false,
};
