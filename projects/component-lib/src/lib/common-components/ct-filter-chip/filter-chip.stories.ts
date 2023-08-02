import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtFilterChipModule } from './ct-filter-chip.module';
import { CtFilterChipComponent } from './ct-filter-chip.component';
import { FilterChipType } from './filter-chip.model';

export default {
  title: 'Component/Common Components/Filter Chip',
  component: CtFilterChipComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtFilterChipModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `<ct-filter-chip [chipConfig]="chipConfig"></ct-filter-chip>`,
});

export const inputFilterChip = TemplateDefault.bind({});
inputFilterChip.args = {
  chipConfig: {
    filterChipId: FilterChipType.input,
    filterDisplayName: 'Email',
    filterId: 'emailFilter', // unique key
    fieldName: 'email',
    filterName: 'txtEmail',
    filterProps: {
      title: 'Email',
      value: '10230',
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
    filterWarnings: false,
    filterStyles: {},
    filterWidth: '70px',
  },
};

export const singleSelectFilterChip = TemplateDefault.bind({});
singleSelectFilterChip.args = {
  chipConfig: {
    filterChipId: FilterChipType.select,
    filterDisplayName: 'Email',
    filterId: 'emailFilter', // unique key
    fieldName: 'email',
    filterName: 'txtEmail',
    filterProps: {
      title: '',
      isMaterial: false,
      singleSelectionMode: false,
      visibleProperty: 'name',
      selectorList: [
        { id: 1, name: 'Dock_02' },
        { id: 2, name: 'Dock_04' },
        { id: 3, name: 'Dock_06' },
        { id: 4, name: 'Dock_08' },
        { id: 5, name: 'Dock_10' },
        { id: 6, name: 'Dock_12' },
        { id: 7, name: 'Dock_14' },
        { id: 8, name: 'Dock_16' },
        { id: 9, name: 'Dock_18' },
        { id: 10, name: 'Dock_20' },
        { id: 11, name: 'Dock_22' },
        { id: 12, name: 'Dock_24' },
        { id: 13, name: 'Dock_26' },
        { id: 14, name: 'Dock_XX' },
      ],
      value: [{ id: 2, name: 'Dock_04' }],
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
    filterWarnings: false,
    filterStyles: {},
    filterWidth: '70px',
  },
};
