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
	copyDir(path.join(os.homedir(),".themes"),path.join(__dirname,"win3.1"));
};
