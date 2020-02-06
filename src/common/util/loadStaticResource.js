import indexedDB from './indexedDB.js';

// 加载window.RESOURCE_URL_LIST数组里的地址
var FONT_MTX = [{
    name: 'fzlt',
    url: `${location.protocol}//loanweb.ppdai.com/web/dist/static/font/fzlt.ttf`,
}, {
    name: 'fzlt_bold',
    url: `${location.protocol}//loanweb.ppdai.com/web/dist/static/font/fzlt_bold.ttf`,
}, {
    name: 'number',
    url: `${location.protocol}//loanweb.ppdai.com/web/dist/static/font/number.otf`,
}, {
    name: 'number_light',
    url: `${location.protocol}//loanweb.ppdai.com/web/dist/static/font/number_light.otf`,
}];
// var FONT_MTX = [{
//     name: 'PPDWebUI',
//     url: 'http://loanweb.ppdai.com/PPDWebUI/1.6.3/PPDWebUI.min.js',
// }];
var loadResourceFromCache = function (key) {
// if (window.localStorage) {
//     return window.localStorage.getItem(key);
// }
    // try {
    //     return IDB.get('STATIC_RESOURCE', key, 'url');
    // } catch (error) {
    //     return Promise.reject(null);
    // }
    // IDB.initDB().then(() => {
    //     return IDB.get('STATIC_RESOURCE', key, 'url');
    // });
    return IDB.get('STATIC_RESOURCE', key, 'url');
    // return null;
};
var getFileSuffixFromUrl = function (url) { // 从url中获取文件后缀
    var result = '';
    if (url) {
        if (url.indexOf('?') > -1) {
            url = url.split('?')[0];
        }
        var urlArr = url.split('/');
        if (urlArr && urlArr.length > 0) {
            var name = urlArr[urlArr.length - 1];
            var nameArr = name.split('.');
            if (nameArr && nameArr.length > 0) {
                result = nameArr[nameArr.length - 1];
            }
        }
    }
    return result;
};
var insertScriptToHead = function (content, type) {
    var newDom = document.createElement('script');
    newDom.type = "text/javascript";
    if (type === 'url') { // 传入的参数为url地址
        newDom.src = content;
        document.head.appendChild(newDom);
    } else { // 传入的参数为文件
        newDom.appendChild(document.createTextNode(content)); // 需排除\符号的转移问题
        document.head.appendChild(newDom);
        // eval(content.replace(/\\/g, '\\\\'));
        // var func = new Function(content);
        // func();
    }
};
var insertStyleToHead = function (content, type) {
    if (type === 'url') { // 传入的参数为url地址
        var newDom = document.createElement('link');
        newDom.rel = 'stylesheet';
        newDom.type = 'text/css';
        newDom.href = content;
    } else { // 传入的参数为文件
        var newDom = document.createElement('style');
        newDom.type = 'text/css';
        newDom.appendChild(document.createTextNode(content));
    }
    document.head.appendChild(newDom);
};
var insertFont = function (name, content, type) {
    var newDom = document.createElement('style');
    if (type !== 'url') { // 传入的参数为url地址
        content = 'data:application/x-font-ttf;base64,' + content;
    }
    // 传入的参数为文件
    newDom.appendChild(
        document.createTextNode(
            '@font-face {\
                font-family: "' + name + '";\
                src: url("' + content + '") format("truetype");\
            }'
        )
    );
    document.head.appendChild(newDom);
};

var isSameURLWithoutPt = function (tgt1, tgt2) {
    if (tgt1 && tgt2) {
        var cmp1 = tgt1.split('://')[1];
        var cmp2 = tgt2.split('://')[1];
        return cmp1 === cmp2;
    }
    return false;
};
var loadStaticResource = function (rsList) {
    var resourceList = rsList || window.RESOURCE_URL_LIST;
    if (resourceList && resourceList.length > 0) {
        resourceList.forEach((item) => {
            var rsUrl = item;
            if (rsUrl) { // 如果有缓存，直接加载缓存
                // var itStr = loadResourceFromCache(rsUrl);
                loadResourceFromCache(rsUrl).then((res) => {
                    var itStr = res && res[0] && res[0].value || null;
                    var type = '';
                    var content;
                    if (itStr) { // 拿到缓存，判断文件类型，分别处理
                      content = itStr;
                    } else { // 未拿到缓存，传入url加载
                      type = 'url';
                      content = rsUrl;
                    }
                    // 根据不同的文件后缀选择不同的加载方式
                    processLoad(rsUrl, content, type);
                }).catch(() => { // 获取资源出错，通过在线加载
                    var type = 'url', content = rsUrl;
                    processLoad(rsUrl, content, type);
                });
                
            }
        })
    }
};

var processLoad = function (rsUrl, content, type) {
    var suffix = getFileSuffixFromUrl(rsUrl);
    switch (suffix) {
        case 'js':
            insertScriptToHead(content, type);
            break;
        case 'css':
            insertStyleToHead(content, type);
            break;
        case 'ttf':
        case 'otf':
            for (var i = 0; i < FONT_MTX.length; i++) {
                if (isSameURLWithoutPt(FONT_MTX[i].url, rsUrl)) {
                    insertFont(FONT_MTX[i].name, content, type);
                }
            }
            break;
        default:
            break;
    }
}

// loadStaticResource();

export default loadStaticResource;