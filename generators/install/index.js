var Generator = require('yeoman-generator');
const child_process = require('child_process');
const spawn = child_process.spawn;

function run(exe, arg, cb) {
    const cmd = spawn(exe, arg);

    cmd.stdout.on('data', function(data) {
        console.log("" + data);
    });
    var s = "";
    cmd.stderr.on('data', function(data) {
        console.log("" + data);
        s += data;
    });

    cmd.on('exit', function(code, signal) {
        if (code === 0) {
            cb(0);
        }else{
            let m = /Cannot find module '([^\/']+)/.exec(s);
            if (m) {
                let mod = m[1];
                install(mod, exe, arg, cb);
            }else{
                cb("安装失败");
            }
        }
    });
}

function install(mod, exe, arg, cb) {
    const cmd = spawn("cnpm", ["i", mod]);

    cmd.stdout.on('data', function(data) {
        console.log("" + data);
    });
    var s = "";
    cmd.stderr.on('data', function(data) {
        console.log("" + data);
        s += data;
    });

    cmd.on('exit', function(code, signal) {
        if (code === 0) {
            run(exe, arg, cb);
        }else{
            cb("安装过程中出现错误");
        }
    });
}

module.exports = class extends Generator {
    install() {
        if (this.args.length<1) {
            this.log("缺少参数");
            return;
        }
        this.log('检查依赖');
        return new Promise((resolve,reject)=>{
            run(this.args[0],this.args.slice(1),x=>x?reject(x):resolve());
        });
    }
    end(){
        this.log('检查完成');
    }
}
;