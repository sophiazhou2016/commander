// 用于调用ppdwebui提供的埋点方案
// 使用场景 ： loanweb站点上的页面作为iframe，被嵌入父页面引入了ppdwebui的不同域页面；该js将使用父页面发送埋点数据
import calPPDWebUIMethods from './calPPDWebUIMethods.js';
const POINT = function (event, param) {
  try {
    calPPDWebUIMethods('TrackService', 'SA', {
      event,
      param
    });
    // PPDWebUI.TrackService.SA({event,param});
  } catch (e) {
    console.error(e);
  }
};
export default POINT;
