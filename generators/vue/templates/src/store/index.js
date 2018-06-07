import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from './logger';
import app from './modules/app';
import user from './modules/user';
import postman from './modules/postman';
let modules = {};

for (let item of [app, user, postman]) {
    modules[item.name] = item;
}

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});