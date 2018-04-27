import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import createLogger from './logger';
import user from './modules/user';
import history from './modules/history';
import service from './modules/service';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	actions,
	getters,
	modules: {
		user,
		history,
		service,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
});