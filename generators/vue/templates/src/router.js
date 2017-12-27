import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import Home from './pages/Home';
import Login from './pages/Home/Login';
import Register from './pages/Home/Register';
import Main from './pages/Home/Main';
import User from './pages/User';
import Dashboard from './pages/User/Dashboard';
import UserList from './pages/User/UserList';
import UserView from './pages/User/UserView';
import AdminUser from './pages/Admin/User';
import AdminNode from './pages/Admin/Node';

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: '',
            name: 'Main',
            component: Main
        },{
            path: 'login',
            name: 'Login',
            component: Login
        }, {
            path: 'register',
            name: 'Register',
            component: Register
        },]
    }, {
        path: '/user/view',
        name: 'UserView',
        component: UserView,
        meta: {
            guest: true
        }
    },{
        path: '/user',
        name: 'User',
        component: User,
        meta: {
            requireAuth: true,
        },
        children: [{
            path: '',
            name: 'Dashboard',
            alias: 'dashboard',
            component: Dashboard
        },{
            path: 'list',
            name: 'UserList',
            component: UserList
        },]
    }, {
        path: '/admin',
        name: 'Admin',
        component: User,
        meta: {
            requireAuth: true,
            requireAdmin: true,
        },
        children: [{
            path: 'node',
            name: 'AdminNode',
            component: AdminNode
        },{
            path: 'user',
            name: 'AdminUser',
            component: AdminUser
        },]
    }]
});

Vue.use(VueRouter);
store.dispatch("whoami");

router.beforeEach((to, from, next) => {
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