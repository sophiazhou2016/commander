const addSth2Param = function(key, param) {
    // 批量增加发标页1、2的isUploadIdCard、feeDiscountRate、saleid
    if (param.page == 'super-发标页1' || param.page == 'super-发标页2') {
        let isUploadIdCardSession = String(
            sessionStorage.getItem('isUploadIdCard')
        )
            .replace(new RegExp('"', 'g'), '')
            .replace('undefined', '');
        let feeDiscountRate = String(sessionStorage.getItem('feeDiscountRate'))
            .replace(new RegExp('"', 'g'), '')
            .replace('undefined', '')
            .match(/\d*(\.\d+)?/)[0];
        let saleid = String(sessionStorage.getItem('saleid'))
            .replace(new RegExp('"', 'g'), '')
            .replace('undefined', '');

        !param.param2 && (param.param2 = isUploadIdCardSession);

        !param.param3 && (param.param3 = saleid);
        if (key.match(/element_imp/) && param.page == 'super-发标页1') {
            param.num6 = feeDiscountRate == '' ? null : feeDiscountRate;
        } else {
            param.num4 = feeDiscountRate == '' ? null : feeDiscountRate;
        }
    }
    return param;
};
function setStorageService(obj) {
    if (PPDWebUI.os.android) {
        return false;
    }
    PPDWebUI.StorageService.setItem(obj, () => {
        console.log('插入成功');
    });
}

const setStorageClk = function(key, param) {
    if (key.match(/_clk/)) {
        switch (param.page) {
            case 'super-首页':
                if (param.tgt_event_id == 'super_resStateDC') {
                    let arr = [];
                    arr.push(param.param8 || null);
                    arr.push(param.param9 || null);
                    arr.push(param.param10 || null);
                    arr.push(param.param11 || null);
                    localStorage.setItem('userInfo', arr);
                    setStorageService({ userInfo: JSON.stringify(arr) });

                    localStorage.setItem('page', '首页运营位');
                    setStorageService({ page: '首页运营位' });

                    localStorage.setItem('bizId', param.bizId);
                    setStorageService({ bizId: param.bizId });
                }
                break;
            case 'super-账户页':
                if (param.tgt_event_id == 'super_resState') {
                    let arr = [];
                    arr.push(param.param10 || null);
                    arr.push(param.param11 || null);
                    arr.push(param.param14 || null);
                    arr.push(param.param15 || null);
                    localStorage.setItem('userInfo', arr);
                    setStorageService({ userInfo: JSON.stringify(arr) });

                    localStorage.setItem('page', '首页运营位');
                    setStorageService({ page: '首页运营位' });

                    localStorage.setItem('bizId', param.bizId);
                    setStorageService({ bizId: param.bizId });
                }
                break;
            default:
                break;
        }
    }
};
typeof PPDWebUI !== 'undefined' &&
    PPDWebUI.ListenerService.resumeListener(() => {
        if (
            location.href.includes('//loanweb.ppdai.com/web/dist/home') ||
            location.href.includes('//loanweb.ppdai.com/web/dist/account')
        ) {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('bizId');
            localStorage.removeItem('page');
            try {
                PPDWebUI.StorageService.setItem({ userInfo: '' }, () => {
                    console.log('删除userInfo');
                });
                PPDWebUI.StorageService.setItem({ page: '' }, () => {
                    console.log('删除page');
                });
                PPDWebUI.StorageService.setItem({ bizId: '' }, () => {
                    console.log('删除bizId');
                });
            } catch (err) {
                console.log(err);
            }
        }
    });
export default {
    addSth2Param,
    setStorageClk
};
