#!/usr/bin/env node

const program = require("commander")
	.version("1.0.0")
	.option("-d, --dbus","Disables the DBus service")
	.parse(process.argv);

const DBus = require("dbus");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const paths = require("../paths.js");
const { exec } = require("child_process");

function spawnWrapper(p) {
	p.stdout.on("data",data => console.log(data.toString()));
	p.stderr.on("data",data => console.error(data.toString()));
	return p;
}

/* Check if the Nordic theme is installed */
if(!fs.existsSync("/usr/share/themes/Nordic") && !fs.existsSync(path.join(paths["THEMES"],"Nordic"))) {
	/* Noric is not installed, install it */
	fs.copySync(path.join(__dirname,"..","Nordic"),path.join(paths["THEMES"],"Nordic"));
}

if(!fs.existsSync(path.join(os.homedir(),".config","fbpanel","rde"))) fs.copySync(path.join(__dirname,"..","config","fbpanel.conf"),path.join(os.homedir(),".config","fbpanel","rde"));

/* Check if the settings are available */
if(!fs.existsSync(paths["SETTINGS"])) fs.copySync(path.join(__dirname,"..","config"),paths["SETTINGS"]);

/* Check if the share is installed */
fs.copySync(path.join(__dirname,"..","share"),paths["SHARE"]);

process.env["GTK_THEME"] = "Nordic";

/* Load settings */
var cfg = JSON.parse(fs.readFileSync(path.join(paths["SETTINGS"],"rde.json")).toString());

/* Start the DBus session. */
if(!program.dbus) {
	var service = DBus.registerService("session","com.rosstechnologies.RDE");
	var serviceObj = service.createObject("/com/rosstechnologies/RDE");
	var serviceIface = serviceObj.createInterface("com.rosstechnologies.RDE");
	serviceIface.addMethod("Kill",{},callback => {
		callback();
		process.exit();
	});
	serviceIface.addMethod("Reconfigure",{},(obj,callback) => {
		cfg = JSON.parse(fs.readFileSync(path.join(paths["SETTINGS"],"rde.json")).toString());
		spawnWrapper(exec("hsetroot -fill "+cfg["wallpaper"]));
		callback();
	});
	serviceIface.update();
}

/* Start internal services */
require("../services/battery.js");

/* Start the desktop environment */
spawnWrapper(exec("compton --dbus --backend glx"));
spawnWrapper(exec("twmnd"));
if(cfg["conky"]) spawnWrapper(exec("conky --config ~/.config/rde/conky.conf"));
if(cfg["guake"]) spawnWrapper(exec("guake"));
spawnWrapper(exec("gdesklets"));
spawnWrapper(exec("paramano"));
spawnWrapper(exec("nm-applet"));
spawnWrapper(exec("hsetroot -fill "+cfg["wallpaper"]));
spawnWrapper(exec("rde-panel"));
spawnWrapper(exec("fbpanel --profile rde"));
spawnWrapper(exec(cfg["wm"])).on("exit",() => {
	process.exit();
});
spawnWrapper(exec("pnmixer"));
spawnWrapper(exec("pulseaudio -k"));
spawnWrapper(exec("pulseaudio --start -nC -F ~/.config/rde/pulseaudio.conf"));
spawnWrapper(exec("play ~/.local/share/rde/sounds/startup.wav"));
