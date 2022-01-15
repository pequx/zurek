module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    'storybook-addon-material-ui'
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config) => ({
    ...config,
    cache: {
      ...config.cache,
      type: 'filesystem',
      store: 'pack',
      memoryCacheUnaffected: true,
      cacheDirectory: '/home/node/.cache/storybook/webpack'
    },
    devServer: {
      ...config.devServer,
      hot: true,
      compress: true
    },
    // optimization: {
    //   ...config.optimization,
    //   moduleIds: 'deterministic',
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         chunks: 'all',
    //       },
    //     },
    //   },
    // },
    output: {
      ...config.output,
    }
  })
}