import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/index';

Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }]
});

// router.afterEach((to, from) => {
// });
export default router;
