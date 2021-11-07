import webpack from 'webpack';
import type { Options } from '@storybook/core-common';
import * as preset from './framework-preset-akashic';

describe('framework-preset-akashic', () => {
  describe('webpack', () => {
    let webpackConfigMock: webpack.Configuration;
    const storybookOptions: Partial<Options> = {
      configType: 'DEVELOPMENT',
      presets: () => ({
        check: true
      }),
      presetsList: []
    };

    beforeEach(() => {
      webpackConfigMock = {};
    });

    describe('resolve.extensions', () => {
      it('extensionsに.tsが追加されること', async () => {
        const config = await preset.webpack({
          ...webpackConfigMock,
          resolve: {
            extensions: ['.js']
          }
        }, storybookOptions as Options);

        expect(config.resolve.extensions).toStrictEqual(['.js', '.ts']);
      });

      it('extensionsが定義されていないときでも.tsが追加されること', async () => {
        const config = await preset.webpack(webpackConfigMock, storybookOptions as Options);

        expect(config.resolve.extensions).toStrictEqual(['.ts']);
      });
    });

    describe('module.rules', () => {
      it('rulesにtsの設定が追加されること', async () => {
        const config = await preset.webpack({
          ...webpackConfigMock,
          module: {
            rules: [{
              test: /\.js$/,
              use: [{
                loader: require.resolve('babel-loader')
              }]
            }]
          }
        }, storybookOptions as Options);

        expect(config.module.rules).toEqual([{
          test: /\.js$/,
          use: [{
            loader: require.resolve('babel-loader')
          }],
        }, {
          test: /\.ts$/,
          use: [{
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: false
            }
          }]
        }]);
      });

      it('rulesが定義されていないときでも.tsが追加されること', async () => {
        const config = await preset.webpack(webpackConfigMock, storybookOptions as Options);

        expect(config.module.rules).toEqual([{
          test: /\.ts$/,
          use: [{
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: false
            }
          }]
        }]);
      });
    });
  });
});
