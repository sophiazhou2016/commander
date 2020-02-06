class Message {
    constructor() {}
    sendMessage(msg) {
        // 入参，例如： let msg= {
        //     func:
        //         'function(params){window.PPDWebUI.CommonService.openUrl(params,function(){},function(){}}',
        //     params: params
        // };
        if (!msg) {
            return false;
        }
        let res = '';
        if (typeof msg === 'object') {
            res = JSON.stringify(msg);
        } else {
            res = msg;
        }
        parent.window.postMessage(res, '*');
    }
    listenMessage(callbackFunc) {
        window.addEventListener(
            'message',
            mes => {
                let param = null;
                let cb = null;
                console.log('msgGet:' + JSON.stringify(mes.data));
                try {
                    param = JSON.parse(mes.data);
                } catch (e) {}
                if (param && param.func) {
                    cb = () => {
                        eval(param.func);
                    };
                    cb && cb(param.msg);
                } else if (callbackFunc) {
                    callbackFunc && callbackFunc(param || mes.data);
                }
            },
            false
        );
    }
}
export default Message;
