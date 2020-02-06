let inserted = false;
const loadTingyun = () => {
    if (!inserted) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        let node = document.createElement('script');
        let position = document.getElementsByTagName('script')[0];
        node.async = true;
        if (isAndroid) {
            node.src = `https://pssweb.ppdai.com/loanapp/tingyun/home/tingyun-rum-android.js`;
        } else if (isiOS) {
            node.src = `https://pssweb.ppdai.com/loanapp/tingyun/home/tingyun-rum-ios.js`;
        } else {
            node.src = `${location.protocol}//loanweb.ppdai.com/web/resource/util/tingyun-rum_loanweb.js`;
        }
        node.setAttribute('charset', 'UTF-8');
        position.parentNode.insertBefore(node, position);
        inserted = true;
    }
}

export default loadTingyun;