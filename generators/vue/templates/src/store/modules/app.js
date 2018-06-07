import { Storage } from "./storage";
import request from "@/common/request";
const store = new Storage("app", {
    show: false,
    loading: 0,
    apps: [],
    mines: [],
    black: [],
});
store.addActions({
    showDrawer() {
        store.commit("show", true);
    },
    hideDrawer() {
        store.commit("show", false);
    },
    toggleDrawer() {
        store.commit("show", !store.state.show);
    },
    async getApps() {
        let apps = await request("/app/list");
        store.commit("apps", apps);
    },
    async getMines() {
        let mines = await request("/app/mines");
        store.commit("mines", mines);
    },
    async getBlack() {
        let black = await request("/black/list");
        store.commit("black", black);
    },
});

export default store;