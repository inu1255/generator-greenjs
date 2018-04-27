const dev = /https?:\/\//.test(location.href);
let host = "http://automan.inu1255.cn";
let api = host;
if (dev) {
    host = (/https?:\/\/[^/:]+/.exec(window.location.href))[0];
    api = host + ":3000";
}
document.write(`<script src="${(dev ? "static/" : "") + "cordova.js"}"></script>`);
export default {
    dev,
    host,
    api,
};