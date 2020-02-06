// 比较类似‘6.8.0’，‘7.0.2.11’之类的版本大小
// 参数4个: currentVersion: 当前被比较版本, targetVersion: 目标版本, 
// symbol: 比较方式, (取值‘>’或，'<'，不传或传其他值默认为’>'), isEql: 是否包含相等的情况，默认为false
const compareAppVersion = (currentVersion, targetVersion, symbol, isEql = false) => {
    let result = false;
    if (currentVersion && targetVersion) {
        const op = symbol === '<' ? 2: 1; // 1为比较是否为大，2为比较是否为小
        const currentArr = currentVersion.split('.');
        const targetArr = targetVersion.split('.');
        const totalLength = currentArr.length > targetVersion.length ? currentArr.length : targetVersion.length;
        if (currentArr.length < totalLength) {
            const time = totalLength - currentArr.length;
            for (let i=0; i< time; i++) {
                currentArr.push('0');
            }
        }
        if (targetArr.length < totalLength) {
            const time = totalLength - targetArr.length;
            for (let i = 0; i < time; i++) {
                targetArr.push('0');
            }
        }
        // 判断是否相等
        if (isEql && currentArr.join('.') === targetArr.join('.')) {
            result = true;
            return result;
        }
        if (op ===1) {
            for (let index = 0; index < totalLength; index++) {
                if (currentArr[index] && targetArr[index]) {
                    if (parseInt(currentArr[index]) > parseInt(targetArr[index])) {
                        result = true;
                        return result;
                    } else if (parseInt(currentArr[index]) < parseInt(targetArr[index])) {
                        result = false;
                        return result;
                    }
                }
            }
        } else {
            for (let index = 0; index < totalLength; index++) {
                if (currentArr[index] && targetArr[index]) {
                    if (parseInt(currentArr[index]) < parseInt(targetArr[index])) {
                        result = true;
                        return result;
                    } else if (parseInt(currentArr[index]) > parseInt(targetArr[index])) {
                        result = false;
                        return result;
                    }
                }
            }
        }
        return result;
    }
};
export default compareAppVersion;