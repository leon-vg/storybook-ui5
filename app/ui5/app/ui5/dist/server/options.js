"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: no-var-requires
var packageJson = require('../../package.json');
exports.default = {
    packageJson: packageJson,
    framework: 'html',
    frameworkPath: '../storybook-ui5/dist/client/index.js',
    frameworkPresets: [require.resolve('./framework-preset-ui5.js')],
};
