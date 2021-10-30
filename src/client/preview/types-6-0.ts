import { Args as DefaultArgs, Annotations, BaseMeta, BaseStory } from '@storybook/addons';
import { StoryFnAkashicReturnType } from './types';

export type { Args, ArgTypes, Parameters, StoryContext } from '@storybook/addons';
export type { StorybookAkashicConfiguration, StorybookAkashicParameters } from './types';

type AkashicE = g.E;
type AkashicReturnType = StoryFnAkashicReturnType;

/**
 * Metadata to configure the stories for a entity.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<Args = DefaultArgs> = BaseMeta<AkashicE> & Annotations<Args, AkashicReturnType>;

/**
 * Story function that represents a entity example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type Story<Args = DefaultArgs> = BaseStory<Args, AkashicReturnType> & Annotations<Args, AkashicReturnType>;
