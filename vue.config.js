module.exports = {
  publicPath: '/Estirency/',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                resources: 'src/assets/styles/variables.scss',
              },
            },
          ],
        },
      ],
    },
  },
};
