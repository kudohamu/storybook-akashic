import type { Configuration } from 'webpack';
import type { Options, TypescriptConfig } from '@storybook/core-common';

export async function webpack(config: Configuration, { presets }: Options) {
  const typescriptOptions = await presets.apply<TypescriptConfig>('typescript', {} as any);

  config.module.rules.push({
    test: /\.ts$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: !typescriptOptions.check
        },
      },
    ],
  });

  config.resolve.extensions.push('.ts');

  return config;
}
