function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

export function random(type, n) {
    if (type === "port") {
        return Math.floor(Math.random() * 10000) + (n || 10000);
    }
    return randomString(n || 6);
}

/**
 * 
 * @param {Function} fn 
 * @param {Function|Object} where 
 */
export function hook(fn, option) {
    if (typeof option === "function") {
        option = {
            before: option
        };
    }
    if (!option || !(option.before || option.after)) return fn;
    return function() {
        if (option.before)
            var data = option.before.apply(this, arguments);
        var res = fn.apply(this, arguments);
        if (option.after)
            option.after(res, data);
        return res;
    };
}