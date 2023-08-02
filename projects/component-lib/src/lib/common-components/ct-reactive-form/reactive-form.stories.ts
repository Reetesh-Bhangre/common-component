import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ReactiveFormsModule } from '@angular/forms';

import { CtReactiveFormComponent } from './ct-reactive-form.component';
import { CtReactiveFormModule } from './ct-reactive-form.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export default {
  title: 'Component/Common Components',
  component: CtReactiveFormComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CtReactiveFormModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `<ct-reactive-form></ct-reactive-form>`,
});

export const reactiveForm = TemplateDefault.bind({});
