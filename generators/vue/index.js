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
            this.copyAll(".babelrc", "web/.babelrc", this.props),
            this.copyAll(".editorconfig", "web/.editorconfig", this.props),
            this.copyAll(".gitignore", "web/.gitignore", this.props),
            this.copyAll(".postcssrc.js", "web/.postcssrc.js", this.props),
            this.copyAll("README.md", "web/README.md", this.props),
            this.copyAll("build", "web/build", this.props),
            this.copyAll("config", "web/config", this.props),
            this.copyAll("index.html", "web/index.html", this.props),
            this.copyAll("package.json", "web/package.json", this.props),
            this.copyAll("src", "web/src", this.props),
            this.copyAll("static", "web/static", this.props),
        ]);
    }
};