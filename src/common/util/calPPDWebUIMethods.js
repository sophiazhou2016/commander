export default function calPPDWebUIMethods(serviceName, methodsName, msg) {
  let res = '';
  if (!msg) {
    msg = null;
  }
  if (typeof msg === 'object') {
    res = JSON.stringify(msg);
  } else {
    res = msg;
  }
  parent.window.postMessage(
    `PPDWebUI@${serviceName}@${methodsName}@${res}`,
    '*'
  );
}
