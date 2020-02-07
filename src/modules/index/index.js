// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '@/common/style/reset.css';
import POINT from '@/common/util/point';

Vue.prototype.POINT = POINT;

// 注册mint-ui组件
import {
    Cell,
    TabContainer,
    TabContainerItem
} from 'mint-ui';

let components = {
    Cell,
    TabContainer,
    TabContainerItem,
};
Object.keys(components).forEach(key => {
    let component = components[key];
    Vue.component(component.name, component);
});

window.Promise = Promise;
const mainComponent = new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});