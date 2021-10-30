import { sync } from 'read-pkg-up';
import { LoadOptions } from '@storybook/core-common';

export default {
  packageJson: sync({ cwd: __dirname }).packageJson,
  framework: 'akashic',
  frameworkPath: '@kudohamu/storybook-akashic',
  frameworkPresets: [require.resolve('./framework-preset-akashic.js')],
} as LoadOptions;
