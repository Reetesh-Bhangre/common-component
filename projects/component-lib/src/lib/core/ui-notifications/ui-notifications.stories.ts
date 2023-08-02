import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { UiNotificationsComponent } from './ui-notifications.component';
import { UiNotificationsModule } from './ui-notifications.module';
import { toastrMessage } from './toastr.interface';

export default {
  title: 'Component/Common Components/ui-notifications',
  component: UiNotificationsComponent,
  decorators: [
    moduleMetadata({
      imports: [UiNotificationsModule, BrowserAnimationsModule],
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

const message: toastrMessage = {
  title: 'This is custom title',
  message: 'This is custom message defined by user',
};
const TemplateDefault: Story = args => {
  return {
    component: UiNotificationsComponent,
    template: `
          <ui-notifications></ui-notifications>
          <button type="button" class="btn btn-sm btn-success" (click)="showSuccess()">Success</button>

        `,
    props: {
      ...args,
    },
  };
};
export const uiNotification = TemplateDefault.bind({});

uiNotification.args = {
  progressBar: true,
  message: message,
};
