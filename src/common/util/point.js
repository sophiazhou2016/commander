import {
    PPDTracker,
    TRACK_EVENT_TYPE,
    IMP_TYPE
} from '@widget/tool';
const exposureImpPage = {
    // 需要设置曝光的页面的埋点信息，不在这个配置里面的点是不会进入滚动曝光的逻辑的，即是否曝光不会被客户端控制
    // tgt_name的匹配规则，每一个应该被滚动曝光的点，都需要在div上拥有name属性==tgt_nameRule匹配后的结果
    'super-首页-super_resState': {
        pointParamName: 'param10',
        tgt_event_id: 'super_resState',
        nodeRule: /(.*)/,
        paramName: 'param6',
        positionParamName: 'param1', // 模块有几行几列这个参数，填在哪里，不需要就不填
        needCombine: true, // 需要合并吗，默认需要合并
        noCombineParams: ['bizId', 'position', 'tgt_name', 'param2', 'param3', 'param9', 'param16'] // 不需要合并的param
    },
    'super-首页-super_resStateDC': {
        pointParamName: 'param14',
        tgt_event_id: 'super_resStateDC',
        nodeRule: /super-贷超资源位-(.*)/,
        paramName: 'tgt_name',
        positionParamName: 'param1', // 模块有几行几列这个参数，填在哪里，不需要就不填
        noCombineParams: ['bizId', 'position', 'num1', 'num2', 'tgt_name', 'param', 'param1', 'param2', 'param3', 'param4', 'param5', 'param6', 'param7', 'param8', 'param9', 'param10', 'param11', 'param12', 'param13', 'param14', 'param15', 'param16', 'param17', 'param18', 'param19']
    },
    'super-账户页-super_resState': {
        needCombine: true, // 需要合并吗，默认需要合并
        pointParamName: 'param16',
        tgt_event_id: 'super_resState',
        nodeRule: /(.*)/,
        paramName: 'param',
        positionParamName: 'param1', // 模块有几行几列这个参数，填在哪里，不需要就不填
        noCombineParams: ['bizId', 'tgt_name', 'position', 'param2', 'param3', 'param9', 'param10', 'param11', 'param14', 'param15', 'param16']
        // tgt_nameRule: /super-资源位-(.*)/
    }
};
// 埋点元素class和他一行能容纳的个数
const rowAmountMap = {
    'grid-item': 4,
    'twoGridItem': 2,
    'rectAdItem': 2,
    'lineAdItem': 1,
    'imgContainer': 99, // banner
    'daiChaoItem': 1,
    'tri-item': 4,
    'four-item': 4
};

function getMergeOption(impObj) {
    let pageKey = impObj.page + '-' + impObj.tgt_event_id;
    let mergeOption = exposureImpPage[pageKey];
    mergeOption && (mergeOption.rowAmountMap = rowAmountMap)
    return mergeOption || {};
}

// 滚动曝光会记录 imphook-name 匹配 tgt_nameRule 的imp事件
let ppdTracker = new PPDTracker({
    EXPOSED_PERCENT: 0.5,
    isHalfAppPage: true,
    STAY_TIME: 2000
});

const POINT = function (key, param) {
    try {
        let eventParams = {};
        if (key === TRACK_EVENT_TYPE.ELEMENT_IMP) {
            let mergeOption = getMergeOption(param);
            eventParams.impType = IMP_TYPE.SCROLL_IMP;
            eventParams.mergeOption = mergeOption;
        }
        ppdTracker.track(key, param, eventParams);
    } catch (e) {
        console.error(e);
    }
};
export default POINT;