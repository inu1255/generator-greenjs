import Vue from 'vue';
import request from './request';
import wrap_query from './query';
import moment from 'moment';
import DrawerMenu from './DrawerMenu';
import PlusButton from './PlusButton';
import PullRefresh from './PullRefresh';

Vue.component("pull-refresh", PullRefresh);
Vue.component("plus-button", PlusButton);
Vue.component("drawer-menu", DrawerMenu);

Vue.prototype.$r = request;
Vue.prototype.$q = wrap_query;

moment.locale("zh-cn");
Vue.filter("fromNow", function(value) {
    if (typeof value === "number" && value < 1000000000000) {
        value *= 1000;
    }
    return moment(value).fromNow();
});
Vue.filter("date", function(value) {
    if (typeof value === "number" && value < 1000000000000) {
        value *= 1000;
    }
    return moment(value).format('YYYY-MM-DD');
});
Vue.filter("time", function(value) {
    if (typeof value === "number" && value < 1000000000000) {
        value *= 1000;
    }
    return moment(value).format('HH:mm:ss');
});
const bs = ["b", "Kb", "Mb", "Gb"];
Vue.filter("traffic", function(v, i, n) {
    v = parseInt(v);
    n = n || 0;
    for (i = i || 0; i < 4; i++) {
        if (v < 1024) {
            return v + bs[i];
        }
        v = (v / 1024).toFixed(n);
    }
    return v + "GB";
});