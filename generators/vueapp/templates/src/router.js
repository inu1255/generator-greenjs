import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import Services from './pages/Home/Services';
import Notices from './pages/Home/Notices';
import ServiceSetting from './pages/Home/ServiceSetting';
import Barcode from './pages/Home/Barcode';
import * as utils from './utils/utils';

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'Services',
        component: Services
    },{
        path: '/service/:sid',
        name: 'Notices',
        component: Notices
    },{
        path: '/service/:sid/setting',
        name: 'ServiceSetting',
        component: ServiceSetting
    },{
        path: '/barcode',
        name: 'Barcode',
        component: Barcode
    }]
});

Vue.use(VueRouter);

var origin = 0;
router.go = utils.hook(router.go, n => origin = n);
router.push = utils.hook(router.push, n => origin = 1);

router.beforeEach((to, from, next) => {
    to.params.origin = origin;
    if (to.meta.requireAuth) {
        let user = store.getters.user();
        if (user) {
            if (to.meta.requireAdmin && user.role != "admin") {
                // next();
            } else {
                next();
            }
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});

export default router;