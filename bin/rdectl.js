#!/usr/bin/env node

const program = require("commander")
	.version("1.0.0")
	.option("-k, --kill","Stops RDE")
	.option("-w, --wallpaper [path]","Sets the wallpaper")
	.parse(process.argv);

const DBus = require("dbus");

var bus = DBus.getBus("session");

bus.getInterface("com.rosstechnologies.RDE","/com/rosstechnologies/RDE","com.rosstechnologies.RDE",(err,iface) => {
	if(err) throw err;
	if(program.kill) {
		iface.Kill(err => {
			if(err) throw err;
			bus.disconnect();
		});
	} else if(program["wallpaper"]) {
		iface.SetWallpaper(program["wallpaper"],err => {
			if(err) throw err;
			bus.disconnect();
		});
	} else bus.disconnect();
});
