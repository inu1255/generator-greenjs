import * as types from '../types';
import router from '../../router';
import request from '../../utils/request';

const state = {
    loading: false,
    data: [],
    sid: 0,
    map: {}
};

const getters = {
    current: state => {
        return state.map[state.sid] || {};
    },
    services: state => {
        return state.data;
    }
};

const actions = {
    async getMysub({ commit, state }, more) {
        if (!state.loading) {
            commit(types.SERVICE_LOADING, request("/service/mysub?offset=" + (more ? state.data.length : 0)));
        }
        try {
            var data = await state.loading;
            commit(types.SERVICE_SET, data);
        } catch (error) {
            commit(types.SERVICE_LOADING, false);
        }
    },
    async getNotices({ dispatch, commit, state }, { sid, more }) {
        let data = await request("/notice/list?sid=" + sid + "&offset=" + (more ? state.data.length : 0));
        if (!state.data.length) {
            await dispatch("getMysub");
        }
        commit(types.NOTICE_SET, { sid, data });
    },
    async unsubscribe({ commit, state }, sid) {
        await request("/service/unsubscribe?sid=" + sid);
        commit(types.SERVICE_UNSUB, sid);
    },
    async sub({ dispatch, commit, state }, key) {
        let data = await request("/service/subscribe?key=" + key);
        router.push("/service/" + data.sid);
    },
};

const mutations = {
    [types.SERVICE_SET](state, data) {
        state.data = data;
        for (let row of data) {
            state.map[row.id] = row;
            row.notices = [];
        }
        state.loading = false;
    },
    [types.SERVICE_LOADING](state, data) {
        state.loading = data;
    },
    [types.NOTICE_SET](state, { sid, data }) {
        state.sid = sid;
        state.map[state.sid].notices = data;
        state.map = Object.assign({}, state.map);
    },
    [types.SERVICE_UNSUB](state, sid) {
        delete state.map[sid];
        state.data = state.data.filter(x => x.id != sid);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};