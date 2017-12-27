const Base = require('../../common/MainGenerator');
// const co = require("co");

module.exports = class extends Base {
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: '项目名',
            default: this.appname
        }]).then((answers) => {
            Object.assign(this.props, answers);
        });
    }
    writing() {
        return Promise.all([
            this.copyAll("api", "api", this.props),
            this.copyAll("common", "common", this.props),
            this.copyAll("public", "public", this.props),
            this.copyAll("router", "router", this.props),
            this.copyAll("test", "test", this.props),
            this.copyAll("package.json", "package.json", this.props),
            this.copyAll("app.js", "app.js", this.props),
            this.copyAll("README.md", "README.md", this.props),
        ]);
    }
}
;