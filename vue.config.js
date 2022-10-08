module.exports = {
  lintOnSave: false,
  assetsDir: 'static',
  css: { loaderOptions: { sass: { additionalData: '@import "@/assets/styles/variables.scss";' } } },
};
