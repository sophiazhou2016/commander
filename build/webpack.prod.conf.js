const FileManagerPlugin = require('filemanager-webpack-plugin');
const ManifestPlugin = require('./plugins/manifest-plugin');
const commonWebpackConfig = require('./webpack.common.config');
const webpack = require('webpack');
const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
let config = require('./config');
const version = config.version;
const rmshost = config.rmshost;
const outputConfig = require('./outputConfig.json');

console.log(
    'version:' + version,
    '-----------------记得在build/config.json修改version-----------------',
    '测试环境：',
    config.env
);
const outputDir = `dist/${version}`;

module.exports = merge(commonWebpackConfig, {
    plugins: [
        new ManifestPlugin({
            needHTML: true
        }),
        new FileManagerPlugin({
            onStart: {
                mkdir: [`zip/${version}`],
                copy: [{ source: 'hs', destination: 'dist/hs' }],
                delete: ['dist/latest', 'zip/latest/']
            },
            onEnd: {
                mkdir: ['zip/latest', 'dist/latest'],
                copy: [
                    { source: 'static', destination: `${outputDir}/static` },
                    { source: outputDir, destination: 'dist/latest' }
                ],
                archive: [
                    {
                        source: outputDir,
                        destination: `zip/${version}/${outputConfig.key}_${version}.zip`
                    },
                    {
                        source: outputDir,
                        destination: `zip/latest/${outputConfig.key}.zip`
                    }
                ]
            }
        }),
        new webpack.DefinePlugin({
            'process.env.sensorsUrl': config.env === 'test'
                ? config.TRACK.SA_URL_DEBUG
                : config.TRACK.SA_URL_RELEASE
        })
    ]
});

// 创建一个currentVersion.js用于记录当前version
fs.mkdir('dist', function() {
    fs.writeFile(
        path.join(__dirname, '../dist/currentVersion.js'),
        `module.exports= {currentVersion:'${version}',rmshost:'${rmshost}',env:'${config.env}'}`,
        function(error) {}
    );
});
