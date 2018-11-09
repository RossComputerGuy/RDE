const fs = require("fs");
const os = require("os");
const path = require("path");

function copyFile(target,source) {
	var targetFile = target;
	if(fs.existsSync(target)) {
		if(fs.lstatSync(target).isDirectory()) targetFile = path.join(target,path.basename(source));
	}
	fs.writeFileSync(targetFile,fs.readFileSync(source));
}

function copyDir(target,source) {
	var files = [];
	var targetFolder = path.join(target,path.basename(source));
	if(!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder);
    if(fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(file => {
            var curSource = path.join(source,file);
            if(fs.lstatSync(curSource).isDirectory()) copyDir(targetFolder,curSource);
            else copyFile(targetFolder,curSource);
        });
    }
}

module.exports.init = () => {
	copyFile(path.join(os.homedir(),".local","share","icons","win98start.png"),path.join(__dirname,"images","startbutton.png"));
	copyFile(path.join(os.homedir(),".config","fbpanel","win9x"),path.join(__dirname,"config","fbpanel.conf"));
	copyDir(path.join(os.homedir(),".themes","Chicago95"),path.join(__dirname,"Chicago95"));
};
