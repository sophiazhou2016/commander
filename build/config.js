const version = `7.13.0.${String(new Date().getFullYear()).slice(-2)}${(
    '0' +
    (new Date().getMonth() + 1)
).slice(-2)}${('0' + new Date().getDate()).slice(-2)}${(
    '0' + process.env.npm_config_buildnum || '0'
).slice(-2)}`;
const test_version = 'test';
module.exports = {
    version: process.env.npm_config_noversion ? test_version : version,
    rmshost: process.env.npm_config_rmshost || '', // 可从外部配置rms上传服务的host，不配就用域名
    env: process.env.npm_config_test ? 'test' : 'pro',
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // Paths
        proxyTable: {
            '/api': {
                target: 'http://fat-h5gateway.ppdapi.com/',
                changeOrigin: true,
                secure: false
            }
        },

        // Various Dev Server settings
        host: 'local.com', // can be overwritten by process.env.HOST
        // host: 'loanweb.ppdai.com', // can be overwritten by process.env.HOST
        // host: '127.0.0.1', // can be overwritten by process.env.HOST
        port: 9090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },
    TRACK: {
        SA_URL_DEBUG: "'https://sensorsdata.ppdai.com/sa/?project=default'", // 测试环境埋点数据接受地址
        SA_URL_RELEASE: "'https://sensorsdata.ppdai.com/sa/?project=production'" // 生产环境埋点数据接收地址
    }
};
