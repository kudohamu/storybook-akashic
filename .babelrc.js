const withTests = {
  presets: [
    [
      '@babel/preset-env',
      { shippedProposals: true, useBuiltIns: 'usage', corejs: '3', targets: { node: 'current' } },
    ],
  ],
  plugins: [
    'babel-plugin-require-context-hook',
    'babel-plugin-dynamic-import-node',
    '@babel/plugin-transform-runtime',
  ],
};

// type BabelMode = 'cjs' | 'esm' | 'modern';

const modules = process.env.BABEL_MODE === 'cjs' ? 'auto' : false;

// FIXME: optional chaining introduced in chrome 80, not supported by wepback4
// https://github.com/webpack/webpack/issues/10227#issuecomment-642734920
const targets = process.env.BABEL_MODE === 'modern' ? { chrome: '79' } : 'defaults';

module.exports = {
  ignore: [],
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        useBuiltIns: 'usage',
        corejs: '3',
        targets,
        modules,
      },
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
    'babel-plugin-macros'
  ],
  env: {
    test: withTests,
  }
};
