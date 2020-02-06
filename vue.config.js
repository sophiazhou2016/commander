const entryConfig = require('./build/entry-config');
const version = require('./build/config').version;
const prodConfig = require('./build/webpack.prod.conf');
const devConfig = require('./build/webpack.dev.config');
const productionMode = process.env.NODE_ENV === 'production';

module.exports = {
    pages: entryConfig.getEntries(),
    publicPath: productionMode ? `${version}/` : './',
    assetsDir: 'static',
    outputDir: productionMode ? `dist/${version}` : 'dist',
    lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: config => {
        if (productionMode) {
            config.mode = 'production';
            return prodConfig;
        } else {
            return devConfig;
        }
    }
};
