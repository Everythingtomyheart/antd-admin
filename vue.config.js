module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        target: process.env.VUE_APP_SERVER_URL + '/v' + process.env.VUE_APP_API_VERSION,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
