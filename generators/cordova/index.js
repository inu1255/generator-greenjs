const Base = require('../../common/MainGenerator');
// const co = require("co");

module.exports = class extends Base {
    prompting() {}
    writing() {
        return Promise.all([
            this.copyAll(".gitignore", ".gitignore", this.props),
            this.copyAll(".npmignore", ".npmignore", this.props),
            this.copyAll("config.xml", "config.xml", this.props),
            this.copyAll("cordova-hcp.json", "cordova-hcp.json", this.props),
            this.copyAll("hooks", "hooks", this.props),
            this.copyAll("icon.js", "icon.js", this.props),
            this.copyAll("package.json", "package.json", this.props),
            this.copyAll("release.sh", "release.sh", this.props),
            this.copyAll("res", "res", this.props),
            this.copyAll("src", "src", this.props),
            this.copyAll("www", "www", this.props),
        ]);
    }
};