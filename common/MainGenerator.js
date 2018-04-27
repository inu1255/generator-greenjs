const Generator = require('yeoman-generator');
let fs = require("fs");
const bluebird = require("bluebird");
const co = require("co");
const path = require("path");

fs = bluebird.promisifyAll(fs);

module.exports = class extends Generator {
    constructor(args, options, config) {
        super(args, options, config);
        this.props = {
            author: this.config.get("author")
        };
    }
    copyAll(from, to, data) {
        if (arguments.length == 2) {
            to = from;
        }
        from = this.templatePath(from);
        to = this.destinationPath(to);
        return this._copyAll(from, to, data);
    }
    _copyAll(from, to, data) {
        var that = this;
        return co(function*() {
            let state;
            try { state = yield fs.statAsync(from); } catch (error) { return; }
            if (state.isDirectory()) {
                let files = yield fs.readdirAsync(from);
                for (let file of files) {
                    that._copyAll(path.join(from, file), path.join(to, file), data);
                }
            } else if (state.isFile()) {
                try {
                    that.fs.copyTpl(from, to, data);
                } catch (error) {
                    that.log(from, error);
                }
            }
        });
    }
};