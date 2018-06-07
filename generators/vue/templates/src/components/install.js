import Vue from 'vue';
import * as filter from '../common/filter';
import request from '../common/request';
import config from '../common/config';
import wrap_query from '../common/wrap_query';
import utils from '../common/utils';
import Preview from './Preview.vue';
import PullRefresh from './PullRefresh';
import DrawerMenu from './DrawerMenu';
import IIcon from './IIcon';
import SearchPanel from './SearchPanel';
import Splite from './Splite';
import ITree from './ITree';
import Collapse from './Collapse';
import TransferDom from '../common/transfer-dom';
import IForm from './IForm';
import { Drawer } from 'vux';

Vue.component('drawer', Drawer);
Vue.component("IForm", IForm);
Vue.directive('transfer-dom', TransferDom);
Vue.component("Collapse", Collapse);
Vue.component("ITree", ITree);
Vue.component("Splite", Splite);
Vue.component("SearchPanel", SearchPanel);
Vue.component("IIcon", IIcon);
Vue.component("DrawerMenu", DrawerMenu);
Vue.component("PullRefresh", PullRefresh);
Vue.component("Preview", Preview);

Vue.prototype.$get = request.get;
Vue.prototype.$post = request.post;
Vue.prototype.$config = config;
Vue.prototype.$utils = utils;
Vue.prototype.$query = wrap_query;
for (let k in filter) {
    Vue.filter(k, filter[k]);
}
Vue.directive('focus', {
    inserted: function(el) {
        let input;
        if (el.tagName == "input")
            input = el;
        else
            input = el.querySelector("input");
        if (input) input.focus();
    }
});
Vue.directive('drag-data', {
    bind: function(el, binding) {
        el.ondragstart = function(e) {
            e.dataTransfer.setData("data", binding.value);
        };
    }
});
Vue.directive('drop', {
    bind: function(el, binding, vnode) {
        if (typeof binding.value === "function") {
            el.ondragenter = function() {
                Vue.set(vnode.context, "dragenter", true);
            };
            el.ondragover = function(e) {
                binding.value(e, e.dataTransfer.getData("data"));
                e.preventDefault();
            };
            el.ondragleave = function() {
                Vue.set(vnode.context, "dragenter", false);
            };
            el.ondrop = function(e) {
                Vue.set(vnode.context, "dragenter", false);
                binding.value(e, e.dataTransfer.getData("data"), true);
            };
        }
    }
});