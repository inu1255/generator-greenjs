import store from "../store/index";
import router from "../router";
import request from "../utils/request";

const native = {};
window.run = function(data) {
    if (data.url) {
        if (data.url.startsWith("http")) {
            window.open(data.url);
        } else {
            window.open("http://" + data.url);
        }
    }
};

function hack(plus) {
    window.open = function(url) {
        plus.runtime.openURL(url);
    };
}

function listenNotification(plus) {
    function onclick(msg) {
        // 分析msg.payload处理业务逻辑 
        if (msg.payload) {
            let data = JSON.parse(msg.payload);
            let location = "/service/" + data.sid;
            if (!router.currentRoute.path.startsWith(location)) {
                router.push(location);
            }
        }
    }
    plus.push.addEventListener("click", function(msg) {
        plus.nativeUI.toast("click");
        onclick(msg);
    });
    // 监听在线消息事件
    plus.push.addEventListener("receive", function(msg) {
        plus.nativeUI.toast("receive");
        onclick(msg);
    });
    var info = plus.push.getClientInfo();
    // alert(JSON.stringify(info, null, 4));
    native.token = info.token;
    store.dispatch("whoami", native.token);
}

function backButton(plus) {
    plus.key.addEventListener('backbutton', function() {
        router.go(-1);
        if (router.currentRoute.path == "/") {
            if ('iOS' == plus.os.name) {
                plus.nativeUI.confirm('确认退出？', function(e) {
                    if (e.index > 0) {
                        plus.runtime.quit();
                    }
                }, 'Watchdog', ['取消', '确定']);
            } else if (confirm('确认退出？')) {
                plus.runtime.quit();
            }
        }
    }, false);
}

function checkUpdate(plus) {
    return new Promise((resolve, reject) => {
        plus.runtime.getProperty(plus.runtime.appid, async function(inf) {
            console.log(JSON.stringify(inf));
            let data = await request("/version/stable?v=" + inf.version);
            if (data.url && data.version > inf.version) {
                plus.downloader.createDownload(data.url, { filename: "_doc/update/" }, function(d, status) {
                    if (status == 200) {
                        console.log("下载wgt成功：" + d.filename);
                        plus.runtime.install(d.filename, {}, function() {
                            console.log("安装wgt文件成功！");
                            plus.nativeUI.toast("更新成功,下次启动生效");
                            resolve(d);
                        }, function(e) {
                            console.log(JSON.stringify(e));
                            reject(e);
                        });
                    } else {
                        reject("下载wgt失败！");
                    }
                }).start();
            }
        });
    });
}

document.addEventListener("plusready", function() {
    var plus = window.plus;
    hack(plus);
    listenNotification(plus);
    backButton(plus);

    // 如果是wifi
    switch (plus.networkinfo.getCurrentType()) {
        case plus.networkinfo.CONNECTION_WIFI:
        case plus.networkinfo.CONNECTION_ETHERNET:
            checkUpdate(plus);
    }

    function installWgt(path) {
        plus.nativeUI.showWaiting("安装wgt文件...");
        plus.runtime.install(path, {}, function() {
            plus.nativeUI.closeWaiting();
            console.log("安装wgt文件成功！");
            plus.nativeUI.alert("应用资源更新完成！", function() {
                plus.runtime.restart();
            });
        }, function(e) {
            plus.nativeUI.closeWaiting();
            console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
            plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
        });
    }
});
if (!window.plus) {
    document.addEventListener("ready", function() {
        store.dispatch("whoami");
    });
}

document.addEventListener("pause", function(e) {
    // plus.push.createMessage("content", JSON.stringify({ sid: 1 }));
});

export default native;