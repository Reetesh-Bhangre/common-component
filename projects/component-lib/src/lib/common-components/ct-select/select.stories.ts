import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtSelectComponent } from './ct-select.component';
import { CtSelectModule } from './ct-select.module';

export default {
  title: 'Component/Common Components/CT-Select',
  component: CtSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [CtSelectModule, BrowserAnimationsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const singleSelectTemplate: Story = args => {
  const formGroup = new FormGroup({
    singleSelect: new FormControl({ id: 1, name: 'Dock_02' }),
  });

  return {
    component: CtSelectComponent,
    template: `
              <form [formGroup]="form">
                <ct-select
                    [title]="title"
                    [selectorList]="selectorList"
                    [visibleProperty]="visibleProperty"
                    [singleSelectionMode]="singleSelectionMode"
                    [allowSearch]="allowSearch"
                    [allowClear]="allowClear"
                    [multiSelectionLimit]="multiSelectionLimit"
                    formControlName="singleSelect"
                    [isError]="isError"
                    [isMaterial]="isMaterial"
                    [placeholder]="placeholder">
                </ct-select>
              </form>
            `,
    props: {
      ...args,
      form: formGroup,
    },
  };
};

export const singleSelect = singleSelectTemplate.bind({});
singleSelect.args = {
  title: 'select',
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
  isMaterial: true,
  visibleProperty: 'name',
  singleSelectionMode: true,
  allowSearch: true,
  allowClear: true,
  multiSelectionLimit: 8,
  isError: false,
  placeholder: 'input placeholder',
};

const multiSelectTemplate: Story = args => {
  const formGroup = new FormGroup({
    multiSelect: new FormControl([
      { id: 2, name: 'Dock_04' },
      { id: 3, name: 'Dock_06' },
    ]),
  });

  return {
    component: CtSelectComponent,
    template: `
                <form [formGroup]="form">
                  <ct-select
                      [title]="title"
                      [selectorList]="selectorList"
                      [visibleProperty]="visibleProperty"
                      [singleSelectionMode]="singleSelectionMode"
                      [allowSearch]="allowSearch"
                      [allowClear]="allowClear"
                      [multiSelectionLimit]="multiSelectionLimit"
                      formControlName="multiSelect"
                      [placeholder]="placeholder"
                      [isError]="isError"
                      [isMaterial]="isMaterial">
                  </ct-select>
                </form>
              `,
    props: {
      ...args,
      form: formGroup,
    },
  };
};
export const multiSelect = multiSelectTemplate.bind({});
multiSelect.args = {
  title: 'select',
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
  isMaterial: true,
  visibleProperty: 'name',
  singleSelectionMode: false,
  allowSearch: true,
  allowClear: true,
  multiSelectionLimit: 8,
  isError: false,
  placeholder: 'input placeholder',
};
