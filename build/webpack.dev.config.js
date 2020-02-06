const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common.config');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const config = require('./config.js');
const path = require('path');

module.exports = merge(commonWebpackConfig, {
    plugins: [
        new FileManagerPlugin({
            onStart: {
                copy: [{
                    source: 'static',
                    destination: 'dist/static'
                }]
            }
        })
    ],
    devServer: {
        clientLogLevel: 'warning',
        disableHostCheck: true,
        hot: true,
        compress: true,
        host: config.dev.host,
        port: config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ?
            {
                warnings: false,
                errors: true
            } :
            false,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: true
        }
    }
});