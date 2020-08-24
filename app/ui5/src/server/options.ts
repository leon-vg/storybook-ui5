// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

export default {
  packageJson,
  framework: 'ui5',
  frameworkPath: 'storybook-ui5/dist/client/index.js',
  frameworkPresets: [require.resolve('./framework-preset-ui5.js')],
};
