const { composePlugins, withNx } = require('@nx/webpack');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = composePlugins(withNx(), (config) => {
  return {
    ...config,
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    output: {
      path: join(__dirname, '../../dist/apps/backend'),
    },
    plugins: [
      new NxAppWebpackPlugin({
        target: 'node',
        compiler: 'tsc',
        main: './src/main.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['./src/assets'],
        optimization: false,
        outputHashing: 'none',
        generatePackageJson: true,
      }),
    ],
  };
});
