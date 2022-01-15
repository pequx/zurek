import HtmlWebpackPlugin from 'html-webpack-plugin'

const PORT = 8080;

const config = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx|json)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: '/home/node/.cache/babel'
          }
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: "/",
  },
  devtool: 'inline-source-map',
  cache: {
    type: 'filesystem',
    store: 'pack',
    memoryCacheUnaffected: true,
    cacheDirectory: '/home/node/.cache/webpack',
  },
  devServer: {
    port: PORT,
    hot: true,
    compress: true
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      manifest: "./public/manifest.json",
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
    }),
  ],
};

export default config;