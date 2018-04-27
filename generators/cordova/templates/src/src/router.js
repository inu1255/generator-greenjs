import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home';
import AppSelect from './pages/AppSelect';
import Proxy from './pages/Proxy';
import ProxySelect from './pages/ProxySelect';
import DomainSelect from './pages/DomainSelect';
import NotFound from './pages/NotFound';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/proxy',
        name: 'Proxy',
        component: Proxy
    }, {
        path: '/proxy-select',
        name: 'ProxySelect',
        component: ProxySelect
    }, {
        path: '/domain-select',
        name: 'DomainSelect',
        component: DomainSelect
    }, {
        path: '/app-select',
        name: 'AppSelect',
        component: AppSelect
    },{
		path: '*',
		name: 'NotFound',
		component: NotFound
	}]
});