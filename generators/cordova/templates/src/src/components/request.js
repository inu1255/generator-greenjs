import config from './config';
import store from '../store';
import Vue from "vue";

let match = config.dev ? config.api : config.api;
const API = match + "/api";

const OPTION = {
    credentials: "include",
    headers: {
        "content-type": "application/json"
    }
};

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

function request(uri, data, headers) {
    store.commit("app.loading", store.state.app.loading + 1)
    var option = Object.assign({}, OPTION);
    if (data) {
        option.method = "POST";
        if (typeof data !== "string") {
            option.body = JSON.stringify(clearNull(data));
        } else
            option.body = data;
    }
    if (headers) {
        option.headers = headers;
    }
    if (!/^https?:\/\//.test(uri)) uri = API + uri
    return new Promise(function(resolve, reject) {
        fetch(uri, option)
            .then(res => res.json())
            .then(function(res) {
                if (store.state.app.loading > 0) store.commit("app.loading", store.state.app.loading - 1)
                if (!res) reject(404);
                else if (typeof res.no === "undefined") resolve(res);
                else if (res.no === 200) resolve(res.data);
                else if (res.no === 401) {
                    if (uri.indexOf("logout") < 0) {
                        store.dispatch("logout");
                    }
                    reject(res.msg);
                } else {
                    Vue.$vux.toast.text("" + res.msg);
                    reject(res.msg);
                }
            }, err => {
                if (store.state.app.loading > 0) store.commit("app.loading", store.state.app.loading - 1)
                reject(err)
            });
    });
}

export default request;