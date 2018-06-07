const cofs = require("../common/cofs");
const config = require("../common/config");

exports.list = function(req, res) {
    let user = req.session.user;
    let uid = user && user.id || 0;
    let dir = config.upload + uid + "/";
    return cofs.isDirectory(dir).then(ok => ok ? cofs.readDir(dir) : []);
};

exports.readdir = function(req, res) {
	const body = req.body;
    return cofs.readDir(body.dir);
};

exports.readfile = function(req, res) {
	const body = req.body;
    return cofs.readfile(body.file);
};