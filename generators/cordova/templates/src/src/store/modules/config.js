import * as types from '../types';
import { LocalStorage } from "./storage";
import Vue from 'vue';

const store = new LocalStorage("config", {
    apps: [],
    apps_allow: [],
    agent: "",
    agent_list: ["192.168.1.119:8888"],
    agent_start: false,
    domains: [],
    all_proxy: false
});

store.addGetters({
    apps_selected(state) {
        return state.apps.filter(x => state.apps_allow.indexOf(x.package) >= 0)
    }
})

store.addActions({
    setAgentStart({ state }, data) {
        if (state.agent_start != data) {
            store.commit("agent_start", data)
            checkStart(data)
        }
    },
    setAllProxy({ state }, data) {
        if (state.all_proxy != data) {
            store.commit("all_proxy", data)
        }
        checkStart(true)
    },
    async proxy(domains, agent) {
        await window.inu.proxy.setDomainProxy(domains, false)
        await window.inu.proxy.start(agent);
    }
})

async function checkStart(data) {
    if (data) {
        if (store.state.agent) {
            let agent = /https?:\/\//.test(store.state.agent) ? store.state.agent : ("http://" + store.state.agent)
            console.log(`start proxy ${agent}`);
            let res = await window.inu.proxy.setDomainProxy(store.state.domains, store.state.all_proxy)
            console.log(`setDomainProxy`, store.state.domains, res)
            await window.inu.proxy.start(agent);
            console.log(`start proxy success`);
            setTimeout(() => {
                window.inu.proxy.isRunning().then(function(flag) {
                    if (store.state.agent_start != flag) {
                        console.log("没有启动成功")
                        // checkStart(store.state.agent_start)
                    }
                });
            }, 3000);
        }
    } else {
        console.log("stop proxy");
        window.inu.proxy.stop();
    }
}

document.addEventListener("deviceready", function() {
    // window.inu.proxy.appList().then(apps => store.commit("apps", apps));
    window.inu.proxy.status().then(function({ running }) {
        if (store.state.agent_start != running) {
            checkStart(store.state.agent_start)
        }
    });
    window.addEventListener("proxy.status", function({ flag }) {
        if (store.state.agent_start == flag) {
            Vue.$vux.toast.text(flag ? "代理启动成功" : "代理已关闭");
            store.commit("agent_start", flag);
        }
    });
});

export default store;