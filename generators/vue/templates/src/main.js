import Vue from 'vue';
import App from './pages/app.vue';
import router from './router.js';
import plugin from './components';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './pages/app.less';
import store from './store';

Vue.use(iView);
Vue.use(plugin);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});