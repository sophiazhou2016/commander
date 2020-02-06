const setNavBar = option => {
    const defaultOpt = {
        naviBar: {
            text: ' ',
            color: '#4D515A'
        },
        rightView: {
            color: '#4D515A',
            menuItems: [
                {
                    text: '',
                    color: '#4D515A'
                }
            ]
        }
    };
    const titleBar = option ? Object.assign(defaultOpt, option) : defaultOpt;
    PPDWebUI && PPDWebUI.CommonService.setTitleBar(titleBar);
};
export default setNavBar;
