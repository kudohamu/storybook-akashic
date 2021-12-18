import global from 'global';
import type * as runtime_g from "@akashic/akashic-engine/index.runtime";
import AE from '@akashic/akashic-engine-standalone';
import { RenderContext, RenderArgs, StorybookAkashicParameters, StorybookAkashicConfiguration } from './types';
import { makeConfiguration, showError } from './utils';

const { window: globalWindow, document } = global;
const rootEl = document.getElementById('root');
let destroyPreviousAEFunc: (() => void) | null = null;

function render({ unboundStoryFn, storyContext, name, kind, scene }: RenderArgs) {
  const element = unboundStoryFn({
    ...storyContext,
    args: {
      ...storyContext.args,
      scene,
    },
  });

  if (!element) {
    showError(scene, name, kind);
    return;
  }

  scene.append(element);
}

function clearPrevious(config: StorybookAkashicConfiguration) {
  if (destroyPreviousAEFunc) destroyPreviousAEFunc();
  destroyPreviousAEFunc = null;

  rootEl.innerHTML = `<canvas id="canvas" width=${config.width} height=${config.height}></canvas>`;
}

export default function renderMain({ unboundStoryFn, storyContext, kind, name, showMain }: RenderContext) {
  const parameters = storyContext.parameters as StorybookAkashicParameters;
  const configuration = makeConfiguration(parameters);

  clearPrevious(configuration);
  showMain();

  destroyPreviousAEFunc = AE.initialize({
    canvas: document.getElementById('canvas'),
    configuration,
    mainFunc: function (g: typeof runtime_g) {
      globalWindow.g = g;
      const scene = new g.Scene({
        game: g.game,
        assetIds: parameters.akashic.assetIds ?? [],
        assetPaths: parameters.akashic.assetPaths ?? [],
      });
      scene.onLoad.addOnce(function () {
        render({ unboundStoryFn, storyContext, kind, name, scene });
      });
      g.game.pushScene(scene);
    },
  });
}
