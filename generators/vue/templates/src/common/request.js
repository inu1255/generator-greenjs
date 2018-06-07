import config from './config';
import store from '../store';
import Vue from "vue";
import axios from 'axios';

var request = axios.create({
    baseURL: config.api + "/api",
    withCredentials: true,
});
request.defaults.headers.post['Content-Type'] = 'application/json';
request.interceptors.request.use(function(config) {
    if (config.loading != false) store.commit("app.loading", store.state.app.loading + 1);
    config.data = clearNull(config.data);
    return config;
}, function(error) {
    return Promise.reject(error);
});

request.interceptors.response.use(function(res) {
    return new Promise((resolve, reject) => {
        setTimeout(x => resolve(res), 800);
    });
});
request.interceptors.response.use(function(res) {
    let data = res.data;
    if (res.config.loading != false && store.state.app.loading > 0) store.commit("app.loading", store.state.app.loading - 1);
    if (!data) return Promise.reject(404);
    else if (typeof data.no === "undefined") return data;
    else if (data.no === 200) return data.data;
    else if (data.no === 401) {
        if (res.config.url.indexOf("logout") < 0) {
            store.dispatch("logout");
        }
        return Promise.reject(data.msg);
    } else {
        let msg = typeof data.msg === "string" ? data.msg : JSON.stringify(data.msg);
        if (Vue.prototype.$message) Vue.prototype.$message({
            showClose: true,
            message: msg,
            type: 'error'
        });
        else Vue.$vux.toast.text(msg);
        return Promise.reject(data.msg);
    }
}, function(error) {
    if (store.state.app.loading > 0) store.commit("app.loading", store.state.app.loading - 1);
    return Promise.reject(error);
});

function clearNull(value) {
    if (typeof value === "object" && !(value instanceof Array)) {
        let data = {};
        for (let k in value) {
            if (value[k] != null) {
                data[k] = clearNull(value[k]);
            }
        }
        return data;
    }
    return value;
}

export default request;