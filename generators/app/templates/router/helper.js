const db = require("../common/db");

exports.wrapApi = function(api, prefix, table) {
    api = api || {};
    prefix = prefix || "";
    api[prefix + "list"] = function(req, res) {
        let body = req.body;
        let user = req.session.user;
        let sql = db.select(table).where({ uid: user.id });
        if (body.where) sql.where(body.where);
        if (body.order) sql.orderBy(body.order);
		if (body.offset || body.size) sql.limit(body.offset, body.size);
		return sql;
    };
    api[prefix + "add"] = function(req, res) {
        let body = req.body;
        let user = req.session.user;
        body.uid = user.id;
        return db.insert(table, body);
    };
    api[prefix + "del"] = function(req, res) {
        let body = req.body;
        let user = req.session.user;
        return db.delete(table).where({ id: body.id, uid: user.id });
    };
    api[prefix + "set"] = function(req, res) {
        let body = req.body;
        let user = req.session.user;
        let id = body.id;
        delete body.id;
        return db.update(table, body).where({ id, uid: user.id });
    };
    return api;
};