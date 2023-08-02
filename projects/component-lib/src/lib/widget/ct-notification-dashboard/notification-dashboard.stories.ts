import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtNotificationDashboardModule } from './ct-notification-dashboard.module';
import { CtNotificationDashboardComponent } from './ct-notification-dashboard.component';

import newNotifications from './../../../../../../src/assets/mock-data/new-notification-list.json';

export default {
  title: 'Component/Widget',
  component: CtNotificationDashboardComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtNotificationDashboardModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `<ct-notification-dashboard [notificationList]="newNotifications" [nonArchiveColDef]="nonArchiveColDef"></ct-notification-dashboard>`,
});

export const notificationDashboard = TemplateDefault.bind({});
notificationDashboard.args = {
  newNotifications: newNotifications,
  nonArchiveColDef: [
    {
      headerName: '',
      maxWidth: 50,
      checkboxSelection: true,
      headerCheckboxSelection: true, // Enable select/unselect all feature
    },
    {
      headerName: 'Title',
      field: 'subject',
      tooltipField: 'subject',
      sortable: true,
      flex: 1,
    },
    {
      headerName: 'Description',
      field: 'message',
      tooltipField: 'message',
      sortable: true,
      flex: 2,
    },
    {
      headerName: 'Date & Time',
      field: 'lastModifiedTs',
      width: 200,
      sortable: true,
      dateTimeFormatter: 'DD MMM YYYY h:mm a',
    },
    {
      headerName: 'Priority',
      field: 'severity',
      width: 120,
      sortable: true,
      cellRenderer: 'tagRender',
    },
    {
      headerName: 'Source',
      field: 'source',
      width: 120,
      tooltipField: 'timestamp',
      sortable: true,
      cellRenderer: 'tagRender',
    },
    {
      headerName: '',
      field: '',
      width: 60,
      cellRenderer: 'deleteIconBtnRender',
    },
  ],
};
