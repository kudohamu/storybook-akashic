import type { Configuration } from 'webpack';
import type { Options, TypescriptConfig } from '@storybook/core-common';

export async function webpack(config: Configuration, { presets }: Options) {
  const typescriptOptions = await presets.apply<TypescriptConfig>('typescript', {} as any);

  config.module = {
    ...(config.module ?? {}),
    rules: [
      ...(config.module?.rules ?? []),
      {
        test: /\.ts$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: !typescriptOptions.check
            },
          },
        ],
      }
    ]
  };

  config.resolve = {
    ...(config.resolve ?? {}),
    extensions: [...(config.resolve?.extensions ?? []), '.ts']
  };

  return config;
}
