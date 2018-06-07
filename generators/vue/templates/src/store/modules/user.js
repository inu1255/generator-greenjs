import { LocalStorage } from "./storage";
import request from '../../common/request';
import io from '@/common/socket';

const store = new LocalStorage("user", {
    user: null,
    body: {}
});

store.addMutations({
    'user.user' (state, data) {
        if (data && !io.user && state.body)
            io.emit("login", state.body);
        if (!data && io.user)
            io.emit("logout");
        state.user = data;
    }
});

store.addActions({
    async login({ commit, state }, body) {
        let user = await request.post("/user/login", body);
        store.commit("body", body);
        store.commit("user", user);
    },
    async register({ commit, state }, body) {
        let user = await request.post("/user/register", body);
        store.commit("user", user);
    },
    async whoami({ commit, state }, force) {
        let user = await request.get("/user/whoami?force=" + (force ? 1 : 0));
        store.commit("user", user);
    },
    async logout({ commit, state }) {
        try {
            await request.get("/user/logout");
        } catch (error) { console.log(error); }
        store.commit("user", null);
    },
});
setTimeout(() => {
    request.get("/user/whoami").then(user => store.commit("user", user));
}, 0);

export default store;