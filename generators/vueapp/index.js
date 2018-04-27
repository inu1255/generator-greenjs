const Base = require('../../common/MainGenerator');
// const co = require("co");

module.exports = class extends Base {
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: '项目名',
            default: this.appname
        }, {
            type: 'input',
            name: 'title',
            message: '网站名',
            default: this.appname
        }]).then((answers) => {
            Object.assign(this.props, answers);
        });
    }
    writing() {
        return Promise.all([
            this.copyAll(".babelrc", this.props),
            this.copyAll(".postcssrc.js", this.props),
            this.copyAll("README.md", this.props),
            this.copyAll("build", this.props),
            this.copyAll("config", this.props),
            this.copyAll("index.html", this.props),
            this.copyAll("manifest.json", this.props),
            this.copyAll("package.json", this.props),
            this.copyAll("src", this.props),
            this.copyAll("static", this.props),
        ]);
    }
};