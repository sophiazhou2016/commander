// 关于浏览器performance
;
(function (win) {
  if (typeof win.performance === 'undefined') {
    return
  }
  var h5_REPORT_URL = '/api/webuimonitor/monitorWebUiService/h5DataReprot';
  var Util = {
    uuid: function () {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    sendRequest: function (obj) {
      // if (Util.getUseragentKey().platform === 'IOS' && window.location.protocol.indexOf('ppdhttp') > -1) {
      //   // 走app调用接口
      //   var data = Util.setNetworkParams(obj)
      //   return new Promise((resolve, reject) => {
      //     if (obj.method === 'get') {
      //       PPDWebUI.NetworkService.get(JSON.stringify(data), function (data) {
      //         resolve(data)
      //       }, function (error) {
      //         reject(error)
      //       })
      //     } else {
      //       PPDWebUI.NetworkService.post(JSON.stringify(data), function (data) {
      //         resolve(data)
      //       }, function (error) {
      //         reject(error)
      //       })
      //     }
      //   })
      // } else {
        var baseConfig = {
          method: '',
          url: '',
          data: '',
          callback: ''
        };
        obj = Object.assign(baseConfig, obj);
        var xhr = new XMLHttpRequest();
        var url = cp ? win.location.origin + obj.url + '?cp=' + cp : win.location.origin + obj.url;
        if (obj.method === 'get') {
          xhr.open('GET', url + '?' + obj.data, true);
          xhr.send(null);
        } else if (obj.method === 'post') {
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
          // xhr.setRequestHeader('X-GW-TENANTID', 'f36caab1')
          // xhr.setRequestHeader('X-GW-APPID', '1000002863')
          // xhr.setRequestHeader('X-GW-PLATFORM', 'h5')
          // xhr.setRequestHeader('X-GW-TIMESTAMP', parseInt(new Date().getTime() / 1000))
          // xhr.setRequestHeader('X-GW-TOKEN', Util.getCookie('token'))
          xhr.setRequestHeader('X-PPD-APPOS', Util.getUseragentKey().appos);
          xhr.setRequestHeader('X-PPD-APPID', Util.getUseragentKey().appId);
          xhr.setRequestHeader('X-PPD-APPVERSION', Util.getUseragentKey.version);
          xhr.setRequestHeader('X-PPD-TIMESTAMP', parseInt(new Date().getTime() / 1000));

          xhr.send(JSON.stringify({
            jsonBody: obj.data
          }));
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status == 200) {
            obj.callback && obj.callback(xhr.responseText)
          }
        }
      // }
    },
    getCookie: function (name) {
      //读取cookies
      var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      if ((arr = document.cookie.match(reg))) return arr[2];
      else return null;
    },
    // 获取对应的目标数组
    getSourceArr(arr, type, val) {
      var _arr = []
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][type] === val) {
          _arr.push(arr[i])
        }
      }
      return _arr
    },
    getTargetArr: function (arr, key) {
      var result = []
      arr.forEach(item => {
        if (item[key]) {
          result.push(item[key]);
        }
      })
      return result
    },
    setNetworkParams: function (params) {
      return {
        header: {
          'X-GW-TENANTID': 'f36caab1',
          'X-GW-APPID': '1000002863',
          'X-GW-PLATFORM': 'h5',
          'X-GW-TIMESTAMP': parseInt(new Date().getTime() / 1000),
          'X-GW-TOKEN': getCookie('token'),
          Cookie: document.cookie
        },
        body: params,
        url: cp ? params.url + '?cp=' + cp : params.url
      }
    },
    // 从useragent里面获取相应的参数
    getUseragentKey: function () {
      var userAgent = navigator.userAgent;
      // var userAgent = 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G9280 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 PPDWebUI/1.1.7 PPDLoanApp/7.4.0.19012402 (AppID/10080004; huawei; PPDStatusBar 40) DUID/cee8a5af63ba7bbfcfaa0ebff9b68b7042282767';
      // pid是PPDLoanApp
      // version是7.4.0.19012402
      // appid是10080004
      // duid是cee8a5af63ba7bbfcfaa0ebff9b68b7042282767
      // openid暂时不传
      // 借款App：PPDLoanApp
      // 还卡超人App：PPDHuanApp
      // 城市贷App：PPDCSDApp
      // 借钱花App：PPDJQHApp
      // 车贝贝App：PPDBBCarApp 
      // KOO分期App：PPDKoouApp
      // KOO管家App：PPDKoobApp
      // 财富APP： PPDLenderApp
      var list = ['PPDLoanApp', 'PPDHuanApp', 'PPDCSDApp', 'PPDJQHApp', 'PPDBBCarApp', 'PPDKoouApp', 'PPDKoobApp', 'PPDLenderApp'];
      var len = list.length
      // 找到对应的渠道pid
      for (var i = 0; i < len; i++) {
        if (userAgent.indexOf(list[i]) > -1) {
          var pid = list[i];
        }
      }
      var appIdReg = /.*AppID\/(\d+).*/;
      var duidReg = /.*DUID\/([a-zA-Z0-9]+).*/
      var versionReg = new RegExp('.*' + pid + '\/([\.0-9]+).*');
      var buildTypeReg = /.*BuildType\/([a-zA-Z]+)*/;
      var appId = appIdReg.exec(userAgent) && appIdReg.exec(userAgent)[1] || '';
      var duid = duidReg.exec(userAgent) && duidReg.exec(userAgent)[1] || '';
      var version = versionReg.exec(userAgent) && versionReg.exec(userAgent)[1] || '';
      var buildType = buildTypeReg.exec(userAgent) && buildTypeReg.exec(userAgent)[1] || '';
      var appos = 1;
      var platform = '';
      var _userAgent = userAgent.toLowerCase();
      if (_userAgent.indexOf('iphone') > -1) {
        platform = 'iOS';
        appos = 1;
      } else {
        platform = 'Android';
        appos = 2;
      }
      return {
        pid: pid,
        appId: appId,
        duid: duid,
        buildType: buildType === 'Release' ? '2' : '1',
        version: version || '6.8.0',
        platform: platform,
        appos: appos
      }
    },
    // 转化时间格式
    setTimestamp: function (t) {
      let year = t.getFullYear();
      let month = Util.addZeroToNumber(t.getMonth() + 1, 2);
      let date = Util.addZeroToNumber(t.getDate(), 2);
      let hour = Util.addZeroToNumber(t.getHours(), 2);
      let min = Util.addZeroToNumber(t.getMinutes(), 2);
      let seconds = Util.addZeroToNumber(t.getSeconds(), 2);
      let milliSeconds = Util.addZeroToNumber(t.getMilliseconds(), 3);
      return [year, month, date].join('-') + ' ' + [hour, min, seconds].join(':') + '.' + milliSeconds;
    },
    // 对数字进行补位
    addZeroToNumber: function (num, count) {
      var arr = [];
      var len = String(num).length;
      if (len < count) {
        var space = count - len;
        for (var i = 0; i < space; i++) {
          arr.push('0');
        }
        return arr.join('') + num;
      }
      return num;
    }
  };


  var performance = win.performance;
  var timing = performance.timing;
  var entriesArr = performance.getEntriesByType('resource');
  var jsArr = Util.getSourceArr(entriesArr, 'initiatorType', 'script');
  var cssArr = Util.getSourceArr(entriesArr, 'initiatorType', 'css');
  var cp = Util.getCookie('cp');

  var ppdMonitor = (function () {
    return {
      // 从数组中获取加载时间最长的时间
      getMaxTime: function (arr) {
        var time = 0
        arr.forEach((item) => {
          if (time === 0 || item.ressponseEnd > time) {
            time = item.responseEnd
          }
        })
        // 单位ms
        return time
      },
      // 获取白屏时间:js 跟 css 加载时间最长的
      getWhiteTime: function () {
        var arr = jsArr.concat(cssArr);
        return this.getMaxTime(arr);
      },
      // 获取可交互时间：
      getInterativeT: function () {
        return timing.domInteractive - timing.navigationStart
      },
      // 获取完全加载时间
      getLoadT: function () {
        return timing.loadEventEnd - timing.navigationStart
      },
      // 封装数据
      setDatas: function () {
        var _this = this
        var resultObj = {
          baseTime: {
            wst: _this.getWhiteTime(),
            fst: 0,
            it: _this.getInterativeT(),
            lt: setTimeout(_this.getLoadT(), 0)
          }
        }
        return resultObj
      },
      // 封装数据
      initialPerData: function (source) {
        var target = {
          eventId: Util.uuid(),
          eventType: 'h5_performance',
          url: window.location.href,
          baseTime: {
            wst: 0,
            fst: 0,
            it: 0,
            lt: 0
          },
          sequenceTime: {
            loadTime: (timing.loadEventEnd - timing.loadEventStart),
            unloadEventTime: (timing.unloadEventEnd - timing.unloadEventStart),
            readyStart: (timing.fetchStart - timing.navigationStart),
            redirectTime: (timing.redirectEnd - timing.redirectStart),
            appcacheTime: (timing.domainLookupStart - timing.fetchStart),
            lookupDomainTime: (timing.domainLookupEnd - timing.domainLookupStart),
            connectTime: (timing.connectEnd - timing.connectStart),
            requestTime: (timing.responseStart - timing.requestStart),
            responseTime: (timing.responseEnd - timing.responseStart),
            initDomTreeTime: (timing.domInteractive - timing.responseEnd),
            domReadyTime: (timing.domComplete - timing.domInteractive),
            loadEventTime: (timing.loadEventEnd - timing.loadEventStart)
          },
          animationTime: [{
            name: '',
            animationStart: 0,
            animationEnd: 0,
            animationIteration: 0,
            totalTime: 0
          }],
          userAgent: navigator.userAgent,
          timestamp: Util.setTimestamp(new Date()),
          platform: Util.getUseragentKey().platform,
          duid: Util.getUseragentKey().duid,
          pid: Util.getUseragentKey().pid,
          appId: Util.getUseragentKey().appId,
          version: Util.getUseragentKey().version,
          openid: '',
          buildType: Util.getUseragentKey().buildType
        }
        var totalResult = Object.assign(target, source)
        // console.log('要发送的请求totalResult：：', totalResult)
        return totalResult
        // 调用接口发送数据
      },
      // 上报白屏时间
      sendDatas: function () {
        var sourceData = this.setDatas()
        var resultData = this.initialPerData(sourceData)
        console.log('sendDatas')
        Util.sendRequest({
          method: 'post',
          url: h5_REPORT_URL,
          data: resultData
        });
        console.log('sendWhiteTime');
      }
    }
  })();

  var DOCERROR = {
    handlerJsError(msg, url, lineNo, columnNo, error) {
      console.log('err msg:', msg, ';url', url, lineNo, columnNo, error);
      DOCERROR.reportError({
        msg,
        url,
        lineNo,
        columnNo,
        error
      })
    },
    // handlerDocError(loadedArr, tagArr) {
    //   var resourceMissArr = tagArr.filter(function (item) {
    //     return !loadedArr.includes(item);
    //   });
    //   resourceMissArr.forEach(item => {
    //     DOCERROR.reportError({
    //       errorCode: '404',
    //       method: 'post',
    //       errorMessage: item // 404资源的src
    //     })
    //   });
    // },
    handlerDocError(path) {
      if (path) {
        DOCERROR.reportError({
          errorCode: '404',
          method: 'post',
          errorMessage: path // 404资源的src
        })
      }
    },
    reportError(obj) {
      var errorInfo = {
        eventId: Util.uuid(),
        eventType: 'h5_document_error',
        function: '',
        row: obj.lineNo || '',
        column: obj.columnNo || '',
        errorCode: obj.errorCode || '',
        errorMessage: obj.msg || obj.errorMessage,
        userAgent: navigator.userAgent,
        timestamp: Util.setTimestamp(new Date()),
        platform: Util.getUseragentKey().platform,
        url: window.location.href,
        version: Util.getUseragentKey().version,
        duid: Util.getUseragentKey().duid,
        pid: Util.getUseragentKey().pid,
        appId: Util.getUseragentKey().appId,
        openid: Util.getUseragentKey().openid || '',
        buildType: Util.getUseragentKey().buildType
      };

      Util.sendRequest({
        method: 'post',
        url: h5_REPORT_URL,
        data: errorInfo
      })
    }
  };

  // 上报js错误
  window.onerror = DOCERROR.handlerJsError;

  win.addEventListener && win.addEventListener('error', (error) => {
    if (error.target && error.target.src) {
      console.log('我知道 404 错误了');
      console.log(
        error, 'xxx', error.target, error.target.src
      );
      DOCERROR.handlerDocError(error.target.src);
    }
    return true;
  }, true);

  win.onload = function () {
    performance = win.performance;
    timing = performance.timing;
    var timer = setInterval(function () {
      if (timing.loadEventEnd) {
        performance = win.performance;
        timing = performance.timing;
        clearInterval(timer);
        console.log('timing.loadEventStart, timing.loadEventEnd:::', timing.loadEventStart, timing.loadEventEnd)
        entriesArr = performance.getEntriesByType('resource');
        jsArr = Util.getSourceArr(entriesArr, 'initiatorType', 'script');
        cssArr = Util.getSourceArr(entriesArr, 'initiatorType', 'css');
        // 上报性能数据
        ppdMonitor.sendDatas();
        // 上报子文档加载错误数据
        // var resourceLoadedArr = Util.getTargetArr(jsArr.concat(cssArr), 'name');
        // var jsTagArr = Util.getTargetArr(document.querySelectorAll('script'), 'src');
        // var cssTagArr = Util.getTargetArr(document.querySelectorAll('style'), 'src');
        // var resourceTagArr = jsTagArr.concat(cssTagArr);
        // console.log('resourceTagArr:', resourceTagArr)
        // console.log('resourceLoadedArr:', resourceLoadedArr)
        // // 对比 resourceTagArr 跟 resourceLoadedArr,找到不在resourceLoadedArr 的resourceTagArr，上报接口
        // DOCERROR.handlerDocError(resourceLoadedArr, resourceTagArr);
      }
    }, 1000)
  }
})(window)
