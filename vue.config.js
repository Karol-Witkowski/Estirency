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
                resources: [
                  'src/assets/styles/mixins/components.scss',
                  'src/assets/styles/vars/colors.scss',
                  'src/assets/styles/vars/typography.scss',
                ],
              },
            },
          ],
        },
      ],
    },
  },
};
