import global from 'global';
const { AE } = require('../../deps/akashic-engine-standalone-3.2.0.min.js');
import * as engine from '@akashic/akashic-engine';
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
    mainFunc: function (g: typeof engine) {
      globalWindow.g = g;
      const scene = new g.Scene({
        // FIXME: type error of `Property 'game' does not exist on type typeof g`.
        game: (g as any).game,
        assetIds: parameters.akashic.assetIds ?? [],
      });
      scene.onLoad.addOnce(function () {
        render({ unboundStoryFn, storyContext, kind, name, scene });
      });
      (g as any).game.pushScene(scene);
    },
  });
}
