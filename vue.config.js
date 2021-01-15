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
                  'src/stylesheets/reusable/mixins/components.scss',
                  'src/stylesheets/reusable/vars/colors.scss',
                  'src/stylesheets/reusable/vars/typography.scss',
                ],
              },
            },
          ],
        },
      ],
    },
  },
};
