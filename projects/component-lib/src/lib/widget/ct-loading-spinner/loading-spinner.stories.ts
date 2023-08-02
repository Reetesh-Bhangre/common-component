import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtLoadingSpinnerModule } from './ct-loading-spinner.module';
import { CtLoadingSpinnerComponent } from './ct-loading-spinner.component';

export default {
  title: 'Component/Widget',
  component: CtLoadingSpinnerComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtLoadingSpinnerModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `<ct-loading-spinner>
            </ct-loading-spinner>`,
});

export const loadingSpinner = TemplateDefault.bind({});
loadingSpinner.args = {};
