import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtWidgetLoadingModule } from './ct-widget-loading.module';
import { CtWidgetLoadingComponent } from './ct-widget-loading.component';

export default {
  title: 'Component/Widget',
  component: CtWidgetLoadingComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtWidgetLoadingModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `<ct-widget-loading 
                [withDarkTheme]="withDarkTheme" 
                [loadingMessage]="loadingText">
            </ct-widget-loading>`,
});

export const widgetLoading = TemplateDefault.bind({});
widgetLoading.args = {
  withDarkTheme: false,
  loadingText: 'Loading Widget...',
};
