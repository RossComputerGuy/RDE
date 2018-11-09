const fs = require("fs-extra");
const os = require("os");
const path = require("path");

module.exports.init = () => {
	fs.writeFileSync(path.join(os.homedir(),".local","share","icons","win98start.png"),fs.readFileSync(path.join(__dirname,"images","startbutton.png"));	fs.writeFileSync(path.join(os.homedir(),".config","fbpanel","win9x"),fs.readFileSync(path.join(__dirname,"config","fbpanel.conf"));
		fs.copySync(path.join(os.homedir(),".themes","Chicago95"),path.join(__dirname,"Chicago95"));
};
