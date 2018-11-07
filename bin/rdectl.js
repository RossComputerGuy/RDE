#!/usr/bin/env node

const program = require("commander")
	.version("1.0.0")
	.option("-k, --kill","Stops RDE")
	.option("-r, --reconfigure","Reloads the settings")
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
	} else if(program["reconfigure"]) {
		iface.Reconfigure(,err => {
			if(err) throw err;
			bus.disconnect();
		});
	} else bus.disconnect();
});
