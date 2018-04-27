const Base = require('../../common/MainGenerator');
// const co = require("co");

module.exports = class extends Base {
    prompting() {
    }
    writing() {
        return Promise.all([
            this.copyAll(".gitignore", ".gitignore", this.props),
            this.copyAll("api", "api", this.props),
            this.copyAll("cert", "cert", this.props),
            this.copyAll("common", "common", this.props),
            this.copyAll("public", "public", this.props),
            this.copyAll("router", "router", this.props),
            this.copyAll("sql", "sql", this.props),
            this.copyAll("test", "test", this.props),
            this.copyAll("package.json", "package.json", this.props),
            this.copyAll("app.js", "app.js", this.props),
            this.copyAll("README.md", "README.md", this.props),
        ]);
    }
};