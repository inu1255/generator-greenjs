import Vue from "vue";
import { Storage } from "./storage";
import request from "../../common/request";

const store = new Storage("postman", {
    collects: [],
    tasks: {},
    nodes: {},
});

store.addGetters({
    collects_tree(state) {
        return state.collects.map(x => {
            return {
                id: x.id,
                label: x.title,
                data: x,
                children: (state.tasks[x.id] || []).map(t => ({
                    id: t.id,
                    label: t.title,
                    data: t,
                    children: (state.nodes[t.id] || []).map(n => ({
                        id: n.id,
                        label: n.title,
                        data: n,
                    })),
                })),
            };
        });
    }
});

store.addMutations({
    addTask(state, data) {
        Vue.set(state.tasks, data.key, data.value);
    },
    addNode(state, data) {
        Vue.set(state.nodes, data.key, data.value);
    },
});

store.addActions({
    async getPostmanCollects({ commit, state }, params) {
        params = params || {};
        let collects = await request.get("/postman/list", { loading: params.loading });
        store.commit("collects", collects);
        return collects;
    },
    async getPostmanTasks({ commit, state }, { loading, ...params }) {
        if (params.cid) {
            let tasks = await request.post("/postman/task_list", { where: params }, { loading });
            store.commit("addTask", { key: params.cid, value: tasks });
            return tasks;
        }
    },
    async getPostmanNodes({ commit, state }, { loading, ...params }) {
        if (params.tid) {
            let nodes = await request.post("/postman/node_list", { where: params }, { loading });
            store.commit("addNode", { key: params.tid, value: nodes });
            return nodes;
        }
    },
});

export default store;