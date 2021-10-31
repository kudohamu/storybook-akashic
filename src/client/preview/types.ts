import { StoryFn, StoryContext, Parameters } from '@storybook/addons';
import { Scene } from '@akashic/akashic-engine';
import { GameConfiguration } from '@akashic/game-configuration';

export type { RenderContext } from '@storybook/core';

export type StorybookAkashicConfiguration = Pick<GameConfiguration, 'width' | 'height' | 'fps' | 'assets' | 'audio' | 'globalScripts' | 'operationPlugins'>;

export type RenderArgs = {
  unboundStoryFn: StoryFn<any>;
  storyContext: StoryContext;
  name: string;
  kind: string;
  scene: Scene;
};

export type StorybookAkashicParameters<DefaultParameters extends {} = Parameters> = DefaultParameters & {
  akashic: {
    assetIds?: (string | g.DynamicAssetConfiguration)[];
    configuration?: Partial<StorybookAkashicConfiguration>;
  };
};

export type StoryFnAkashicReturnType = g.E;

export interface IStorybookStory {
  name: string;
  render: () => any;
}

export interface IStorybookSection {
  kind: string;
  stories: IStorybookStory[];
}
