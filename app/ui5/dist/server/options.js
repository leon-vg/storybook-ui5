"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var packageJson = require('../../package.json');

var _default = {
  packageJson: packageJson,
  framework: 'ui5',
  frameworkPath: 'storybook-ui5/dist/client/index.js',
  frameworkPresets: [require.resolve('./framework-preset-ui5.js')]
};
exports.default = _default;