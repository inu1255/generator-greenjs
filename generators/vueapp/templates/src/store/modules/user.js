import * as types from '../types';
import request from '../../utils/request';
import router from '../../router';
import native from "../../utils/native";

const state = {
    user: {}
};

const getters = {
    user: state => state.user,
    isAdmin: state => state.user && state.user.role == 'admin',
    logined: state => Boolean(state.user),
};

const actions = {
    async login({ dispatch, commit, state }, body) {
        let user = await request("/user/login", body);
        commit(types.USER_LOGIN, user);
        if (native.token) {
            await dispatch("whoami", native.token);
        }
    },
    async register({ dispatch, commit, state }, body) {
        let user = await request("/user/register", body);
        commit(types.USER_LOGIN, user);
        if (native.token) {
            await dispatch("whoami", native.token);
        }
    },
    async whoami({ commit, state }, token) {
        let user = await request("/user/whoami?token=" + (token || ""));
        commit(types.USER_LOGIN, user);
    },
    async logout({ commit, state }, force) {
        if (force) {
            try {
                await request("/user/logout");
            } catch (error) { console.log(error); }
        }
        commit(types.USER_LOGIN, null);
    },
};

const mutations = {
    [types.USER_LOGIN](state, user) {
        state.user = user;
        // if (user) {
        // 	if (/(login)|(register)/.test(router.currentRoute.fullPath)) {
        // 		let redirect = router.currentRoute.query.redirect;
        // 		if (!redirect || redirect.length < 2) {
        // 			redirect = "/user/dashboard";
        // 		}
        // 		router.history.push(redirect);
        // 	}
        // } else {
        // 	let meta = router.currentRoute.meta || {};
        // 	if (meta.guest) {
        // 		return;
        // 	}
        // 	let redirect = router.currentRoute.fullPath;
        // 	if (/(login)|(register)/.test(router.currentRoute.fullPath)) {
        // 		redirect = "/user/dashboard";
        // 	}
        // 	router.history.push({
        // 		path: "/login",
        // 		query: {
        // 			redirect
        // 		}
        // 	});
        // }
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};