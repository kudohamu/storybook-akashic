import { GameConfiguration } from '@akashic/game-configuration';
import * as engine from '@akashic/akashic-engine';
import { StorybookAkashicParameters } from './types';

export function makeConfiguration(parameters: StorybookAkashicParameters): Omit<GameConfiguration, 'main'> {
  const config = parameters.akashic.configuration;

  return {
    fps: config?.fps ?? 60,
    width: config?.width ?? 640,
    height: config?.height ?? 640,
    assets: config?.assets,
    audio: config?.audio,
    globalScripts: config?.globalScripts,
    operationPlugins: config?.operationPlugins,
    defaultLoadingScene: 'none',
  };
}

export function showError(scene: engine.Scene, name: string, kind: string) {
  const fontSize = 13;
  const font = new engine.DynamicFont({
    game: scene.game,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    size: fontSize,
  });

  scene.append(new engine.FilledRect({ scene, width: scene.game.width, height: scene.game.height, cssColor: '#BC2424' }));

  const title = new engine.Label({
    scene,
    font,
    text: `Expecting a g.E from the story: "${name}" of "${kind}".`,
    fontSize,
    textColor: '#fff',
  });
  title.x = Math.round((scene.game.width - title.width) / 2);
  title.y = Math.round((scene.game.height - title.height) / 2) - 12;
  scene.append(title);

  const description = new engine.Label({
    scene,
    font,
    text: 'Did you forget to return the g.E from the story?',
    fontSize,
    textColor: '#fff',
  });
  description.x = Math.round((scene.game.width - description.width) / 2);
  description.y = title.y + title.height + 8;
  scene.append(description);
}
