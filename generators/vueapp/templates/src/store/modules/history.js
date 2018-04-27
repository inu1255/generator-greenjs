import * as types from '../types';
import router from '../../router';
import request from '../../utils/request';

const state = {
    n: 0
};

const getters = {

};

const actions = {
    go({ commit, state }, data) {
        commit(types.HISTORY_GO, data);
    },
};

const mutations = {
    [types.HISTORY_GO](state, data) {
        state.n = data;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};