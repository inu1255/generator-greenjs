const fs = require("fs");
const child_process = require("child_process");

let src = "./res/icon/icon.png";
if (process.argv.length>2) {
	src = process.argv[2];
}
if (!fs.existsSync(src)) {
    console.log("图标不存在");
    process.exit();
}
let root = "./res/icon/";
let dirs = fs.readdirSync(root);
for (let dir of dirs) {
    if (fs.statSync(root + dir).isDirectory()) {
        let filenames = fs.readdirSync(root + dir);
        for (let filename of filenames) {
            if (filename.endsWith(".png")) {
                let size = /\d+/.exec(filename)[0];
                let x = /(\d+)x/.exec(filename);
				size = x ? x[1] * size : size;
				child_process.exec(`convert ${src} -resize ${size}x${size}! ${root+dir+"/"+filename}`);
                // console.log(`convert ${src} -resize ${size}x${size}! ${root+dir+"/"+filename}`);
            }
        }
    }
}