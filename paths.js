const os = require("os");
const path = require("path");

module.exports = {
	"HOME": os.homedir(),
	"SHARE": path.join(os.homedir(),".local","share","rde"),
	"THEMES": path.join(os.homedir(),".themes"),
	"SETTINGS": path.join(os.homedir(),".config","rde")
};
