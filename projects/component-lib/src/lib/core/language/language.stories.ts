import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ReadmeStoryComponent } from './readmestory.component';
import markdown from './OVERVIEW.md';

export default {
  title: 'Services/Localization',
  component: ReadmeStoryComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      schemas: [],
      declarations: [ReadmeStoryComponent],
      entryComponents: [],
    }),
  ],
  parameters: {
    notes: markdown
  }
} as unknown as Meta;

const templateDefault: Story = args => ({
  props: args,
  template: `<ct-readmestory>
              </ct-readmestory>`,
});

export const languageModule = templateDefault.bind({});
languageModule.args = {
};