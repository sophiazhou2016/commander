var fs = require('fs');
var crypto = require('crypto');

class ManifestPlugin {
    constructor({
        needHTML
    }) {
        this.needHTML = needHTML || true; // 离线html
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('ManifestPlugin', (compilation, callback) => {
            let contentArr = [];
            let assets = compilation.assets;
            for (let filePath in assets) {
                let hash = crypto.createHash('md5');
                let md5Res = hash.update(assets[filePath].source()).digest('hex');
                let currentPath = filePath.split('?')[0];
                if (this.needHTML) {
                    contentArr.push({
                        filePath: currentPath,
                        md5: md5Res,
                    });
                } else if (!currentPath.includes('.html')) {
                    contentArr.push({
                        filePath: currentPath,
                        md5: md5Res,
                    });
                }
            }
            compilation.assets['manifest.json'] = {
                source: function () {
                    return JSON.stringify(contentArr);
                },
                size: function () {
                    return 15;
                },
            };
            callback();
        });
    }
}
module.exports = ManifestPlugin;