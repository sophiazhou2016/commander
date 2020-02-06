import { sendRequest } from '@widget/tool';

export default async params => {
    return new Promise((resolve, reject) => {
        sendRequest({
            method: 'post',
            // url: 'loanop/loanAdOpService/showWeChatEntrance',
            url: 'loanhome/loanAdService/showWeChatEntrance',
            params,
        }).then(res => {
            let { Result, Content } = res;
            if (Result === 200) {
                resolve(Content);
            }
        });
    });
};
