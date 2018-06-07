import moment from 'moment';
moment.locale("zh-cn");

export function fromNow(value) {
    if (typeof value === "number" && value < 1000000000000) {
        value *= 1000;
    }
    return moment(value).fromNow();
}

export function date(value) {
    if (typeof value === "number" && value < 1000000000000) {
        value *= 1000;
    }
    return moment(value).format('YYYY-MM-DD');
}

export function time(value) {
    if (typeof value === "number" && value < 1000000000000) {
        value *= 1000;
    }
    return moment(value).format('HH:mm:ss');
}

const bs = ["b", "Kb", "Mb", "Gb"];
export function traffic(v, i, n) {
    v = parseInt(v);
    n = n || 0;
    for (i = i || 0; i < 4; i++) {
        if (v < 1024) {
            return v + bs[i];
        }
        v = (v / 1024).toFixed(n);
    }
    return v + "GB";
}