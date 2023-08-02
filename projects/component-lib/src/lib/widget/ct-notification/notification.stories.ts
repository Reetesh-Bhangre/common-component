import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtNotificationModule } from './ct-notification.module';
import { CtNotificationComponent } from './ct-notification.component';

import newNotifications from './../../../../../../src/assets/mock-data/new-notification-list.json';

export default {
  title: 'Component/Widget',
  component: CtNotificationComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtNotificationModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `<ct-notification 
                [isDropdownActive]="isDropdownActive" 
                [boardLoadingMask]="boardLoadingMask" 
                [countLoadingMask]="countLoadingMask"
                [withDarkTheme]="withDarkTheme" 
                [notificationCount]="notificationCount" 
                [notificationMessages]="notificationMessages"
                [topGutter]="topGutter">
            </ct-notification>`,
});

export const notification = TemplateDefault.bind({});
notification.args = {
  withDarkTheme: false,
  notificationCount: 5,
  boardLoadingMask: false,
  countLoadingMask: false,
  isDropdownActive: true,
  topGutter: 70,
  notificationMessages: newNotifications,
};
