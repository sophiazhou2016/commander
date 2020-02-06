const setBar = option => {
    const defaultOpt = {
        visible: '1', //1显示，2不显示
        leftView: [
            {
                //左边按钮1设置
                action: 'back', //返回键。除“back、cancel、menu”外，其它按钮类型皆为“custom”
                color: '#4D515A', //内容颜色
                text: '返回', //按钮文字。若要使用text文字，则icon不要设置。
                fontSize: '', //字体大小
                icon: 'ppdwebui://resource/drawable/nav_back',
                callback: '' //native回调函数;
            }
        ],
        titleView: {
            text: document.title, //中间标题内容，*不想要标题则传入''
            color: '#4D515A', //中间标题颜色
            fontSize: '18' //中间字体大小
        }
    };
    const barConfig = option ? Object.assign(defaultOpt, option) : defaultOpt;
    typeof PPDWebUI !== 'undefined' &&
        PPDWebUI.CommonService.setNavigation(
            barConfig,
            function(data) {},
            function(err) {}
        );
};

export default setBar;
