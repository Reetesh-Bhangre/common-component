import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  angularLegacyRendering: true,
  backgrounds: {
    default: 'onFormView',
    values: [
      {
        name: 'onFilterView',
        value: '#75C3DF',
      },
      {
        name: 'onFormView',
        value: '#FFF',
      },
    ],
  },
};
