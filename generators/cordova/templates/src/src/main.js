import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import './vux';
import './components';
import store from './store';
import router from './router';
import './styles/vux.less';
import io from './components/socket';

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
            if (store.state.user.user)
                io.emit("login", store.state.user.body);
        },
        logined: function(user) {
            io.user = user;
            console.log("ws logined", user);
        },
        cookie_success: function(aid) {
			console.log("cookie_success", aid);
			store.dispatch("getMines");
            if (cordova) {
                cordova.plugins.notification.local.schedule({
                    title: '脚本录制',
                    text: '脚本已经开始工作了',
                    foreground: true
                });
            }
            if (plugins) {
                plugins.toast.showLongCenter("脚本录制成功");
            }
            setTimeout(window.inu.proxy.stop, 1e3);
        },
        msg(msg) {
            console.log("ws msg", msg);
            if (cordova) {
                cordova.plugins.notification.local.schedule({
                    title: '脚本录制',
                    text: msg,
                    foreground: true
                });
            }
            if (plugins) {
                plugins.toast.showLongCenter("msg");
            }
        }
    },
    render: h => h(App)
}).$mount('#app');