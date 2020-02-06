import {
    sendRequest
} from '@widget/tool';
const urlMap = {
    'apiName': '/apiPath'
};
export function sendCommonRequest(name, params = {}, method = 'post') {
    return sendRequest({
        method: method,
        url: urlMap[name],
        noErrMsg: true,
        params,
        showToast: false,
        showLoading: true
    });
}