# @kudohamu/storybook-akashic

@kudohamu/storybook-akashic は [Storybook](https://storybook.js.org/) を使った [Akashic Engine](https://akashic-games.github.io/) のエンティティ用のUI開発環境を提供します。  
`g.E` や `g.Label` などのエンティティをエンティティ単位で視覚化し、さまざまな状態を確認しながらインタラクティブに開発できます。

![Screen Shot](https://github.com/kudohamu/storybook-akashic/blob/main/assets/screenshot.gif)  

## How to Install

```
$ npm i -D @kudohamu/storybook-akashic
```

## How to Use

### Basic Use

ミニマルな利用であれば@storybook/reactなどと全く同じ様に、「タイトルなどのメタデータ」と「エンティティの生成に必要なパラメータを受け取ってエンティティを生成して返す関数」をstoryからエクスポートするだけでStorybookに表示することができます。

```typescript
// Button.stories.ts

import { Story } from '@kudohamu/storybook-akashic';
import { Button, ButtonParameter } from '.';

export default {
  title: 'Button'
};

const Template: Story<ButtonParameter> = (params) => {
  return new Button({
    width: 200,
    height: 56,
    ...params
  });
};

export const Default = Template.bind({});
```

### With Assets

表示したいエンティティが画像などのアセットを使用する場合、対象のアセットIDがどのパスから取得できるかを@kudohamu/storybook-akashicに教えてあげる必要があります。  
`.storybook/preview.ts` または各storyファイルからエクスポートするparametersに、必要な[GameConfiguration](https://akashic-games.github.io/reference/akashic-engine-v3/interfaces/gameconfiguration.html)と使用するassetIdを含めることで@kudohamu/storybook-akashicがアセット情報を読み取ることができるようになります。  

```typescript
// .storybook/preview.ts

import { GameConfiguration } from '@akashic/game-configuration';
import { StorybookAkashicParameters } from '@kudohamu/storybook-akashic';
const gameJson: GameConfiguration = require('../game.json');

export const parameters: StorybookAkashicParameters = {
  akashic: {
    assetIds: ['player', 'background'],
    configuration: gameJson
  }
};
```

また上記の情報から得られたアセットのパスにStorybookがアクセスできるようにしてください。  
これは `start-storybook` で立ち上げる際に関連するアセットをstatic filesとして指定しなければならないことを意味します。  

```json
"scripts": {
  "storybook": "start-storybook -p 6006 -s ./audio,./image,./text"
}
```

Storybookをビルドするときも同様です。

```json
"scripts": {
  "build-storybook": "build-storybook -p 6006 -s ./audio,./image,./text"
}
```

## Demo Project

利用者の理解を助けるために@kudohamu/storybook-akashicを使ったデモプロジェクトを公開しています。  
より実践的で詳細な使用方法は下記プロジェクトを参考にしてください。  

[https://github.com/kudohamu/storybook-akashic-demo](https://github.com/kudohamu/storybook-akashic-demo)

## License

本リポジトリは MIT License の元で公開されています。 詳しくは [LICENSE](https://github.com/kudohamu/storybook-akashic/blob/main/LICENSE) をご覧ください。
