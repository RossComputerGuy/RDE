const fs = require("fs");
const os = require("os");
const path = require("path");

const SYMS = {
	"id": Symbol("id")
};

class Theme {
	constructor(id) {
		this[SYMS["id"]] = id;
	}
	
	init() {
		try {
			require(path.join(this.path,"index.js")).init(this);
		} catch(ex) {
			console.error(ex);
		}
	}
	
	get path() {
		return path.join(os.homedir(),".local","share","rde","themes",this[SYMS["id"]]);
	}
	get info() {
		return JSON.parse(fs.readFileSync(path.join(this.path,"theme.json")).toString());
	}
}
module.exports = Theme;
