module.exports = {
  stories: [
    "../projects/component-lib/src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../projects/component-lib/src/lib/**/**.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-notes/register'
  ],
  framework: "@storybook/angular",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
