// 关闭当前webview
window.closeWebView = function() {
    window.PPDWebUI && window.PPDWebUI.CommonService.close()
}

// 为PPDWebUi.js注册全局方法，返回唯一的方法名称字符串
window.globalMethodArray = []
const parseGlobalMethod = (func) => {
    const pfxName = 'global_method_name_'
    const methodName = pfxName + window.globalMethodArray.length
    window[methodName] = () => {
        try {
            if (func && typeof func === 'function') {
                func()
            } else {
                history.back()
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    window.globalMethodArray.push(methodName)
    return methodName + '()'
}
export default parseGlobalMethod