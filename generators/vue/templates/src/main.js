import './components/install';
// import './components/vux';
import './components/el';
import './styles/base.less';
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import store from './store';
import router from './router';
import VueSocketio from 'vue-socket.io';
import io from './common/socket';
import config from './common/config';

window.store = store;
Vue.use(VueRouter);
Vue.use(VueSocketio, io);

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    sockets: {
        connect: function() {
            console.log('socket connected');
        }
    },
    render: h => h(App)
}).$mount('#app');