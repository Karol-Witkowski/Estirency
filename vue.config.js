module.exports = {
  publicPath: '/Estirency/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/styles/var/colors.scss";',
      },
    },
  },
};
