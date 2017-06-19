// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 1338,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {

      '/api-gateway/jwt/token': {
        target: 'https://qafat2-apigateway.qa.vonagenetworks.net/api-gateway/jwt/token   [P]',
        changeOrigin: true,
        pathRewrite: {
          '/api-gateway/jwt/token': ''
        }
      },
      '/unifiedServicesCRM': {
        target: 'https://qafat2-apigateway.qa.vonagenetworks.net/unifiedServicesCRM',
        changeOrigin: true,
        pathRewrite: {
          '/unifiedServicesCRM': ''
        }
      },
      '/ssu-api': {
        target: 'https://purchase.panther.vocal-dev.com/ssu-api',
        changeOrigin: true,
        pathRewrite: {
          '/ssu-api': ''
        }
      },

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
