const fs = require('fs');
let moduleRootPath = 'src/modules'; // 模块根目录(这个可以根据自己的需求命名)
let moduleInfo = null;

exports.getEntries = function getEntries() {
    // 初始化模块列表
    this.getModuleInfo();
    console.log('*********************************** entries ***********************************');
    console.log(JSON.stringify(moduleInfo));
    return moduleInfo;
};
exports.getModuleInfo = function getModuleInfo() {
    // 判断是否为空，不为空则直接返回
    if (moduleInfo) {
        return moduleInfo;
    } else {
        // 为空则读取列表
        moduleInfo = {};
        readDirSync(moduleRootPath, '', true);
        return moduleInfo;
    }
};
/**
 * 深度遍历目录，并整理多页面模块
 * @param path 需要变量的路径
 * @param moduleName 模块名称
 */
function readDirSync(path, moduleName, nextLevel) {
    // 缓存模块对象
    let moduleObj = {
        entry: '',
        template: '',
        filename: '',
        // chunks: ['chunk-vendors', 'chunk-common'],
    };
    // 获取当前模块ID
    let moduleID = path.replace(moduleRootPath + '/', '');
    if (path == moduleRootPath) {
        moduleID = '';
    }
    // 获取目录下所有文件及文件夹
    let pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        let info = fs.statSync(path + '/' + ele);
        if (info.isDirectory()) {
            // console.log("dir: "+ele)
            nextLevel && readDirSync(path + '/' + ele, ele, false);
        } else {
            // 判断当前模块的html是否存在
            if (ele == 'index.html') {
                moduleObj.template = path + '/' + ele;
                moduleObj.filename = moduleID + '/' + 'index.html';
            }
            // 判断当前模块的js是否存在
            if (ele == 'index.js') {
                moduleObj.entry = path + '/' + ele;
            }
            // console.log("file: "+ele)
        }
    });
    // 判断模块是否真实(可能只是个分级目录)
    if (
        (moduleObj.moduleID != '' && moduleObj.moduleHTML != '') ||
        (moduleObj.moduleID != '' && moduleObj.moduleJS != '')
    ) {
        if (moduleID) {
            moduleInfo[moduleID] = moduleObj;
        }
    }
}
// exports.getEntries();