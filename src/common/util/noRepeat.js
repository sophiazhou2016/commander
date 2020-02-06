class NoRepeat {
    constructor(param) {
        let { stayTime = 500 } = param || {};
        this.stayTime = stayTime;
        this.clickBool = true;
        console.log('click防重中');
        this.initFunc();
    }
    initFunc() {
        document.body.addEventListener('click', e => {
            // console.log('+++click');
            if (this.clickBool) {
                this.clickBool = false;
                // console.log('---click');
                setTimeout(() => {
                    this.clickBool = true;
                }, this.stayTime);
            }
        });
    }
}
export default NoRepeat;
