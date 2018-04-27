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
            this.copyAll(".babelrc", ".babelrc", this.props),
            this.copyAll(".editorconfig", ".editorconfig", this.props),
            this.copyAll(".gitignore", ".gitignore", this.props),
            this.copyAll(".postcssrc.js", ".postcssrc.js", this.props),
            this.copyAll("README.md", "README.md", this.props),
            this.copyAll("build", "build", this.props),
            this.copyAll("config", "config", this.props),
            this.copyAll("index.html", "index.html", this.props),
            this.copyAll("package.json", "package.json", this.props),
            this.copyAll("src", "src", this.props),
            this.copyAll("static", "static", this.props),
        ]);
    }
};