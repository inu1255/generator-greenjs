import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import createLogger from './logger';
import config from './modules/config';
import app from './modules/app';
import user from './modules/user';
let modules = {};

for (let item of [config, app, user]) {
    modules[item.name] = item;
}

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    modules,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});