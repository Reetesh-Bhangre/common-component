import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtFilterBarModule } from './ct-filter-bar.module';
import { CtFilterBarComponent } from './ct-filter-bar.component';
import { FilterChipType } from '../ct-filter-chip/filter-chip.model';

export default {
  title: 'Component/Common Components/Filter Bar',
  component: CtFilterBarComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtFilterBarModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `<ct-filter-bar [filtersList]="filtersList"></ct-filter-bar>`,
});

export const filterBar = TemplateDefault.bind({});
filterBar.args = {
  filtersList: [
    {
      filterChipId: FilterChipType.input,
      filterDisplayName: 'Email',
      filterId: 'email', // unique key
      fieldName: 'email',
      filterName: 'txtEmail',
      filterProps: {
        title: 'Placeholder Email1',
        val: 'Value of email',
      },
      filterValidations: {
        errStatus: false,
        errMessages: [
          {
            email: 'This is invalid email',
          },
          {
            invalid: 'This is invalid email',
          },
        ],
      },
    },
    {
      filterChipId: FilterChipType.input,
      filterDisplayName: 'Name',
      filterId: 'name', // unique key
      fieldName: 'email',
      filterName: 'txtEmail',
      filterProps: {
        title: 'Placeholder Name',
        value: 'Name',
      },
      filterValidations: {
        errStatus: false,
        errMessages: [
          {
            email: 'This is invalid name',
          },
          {
            invalid: 'This is invalid name',
          },
        ],
      },
    }
  ],
};
