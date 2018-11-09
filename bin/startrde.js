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
const Theme = require("../theme.js");
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

fs.copySync(path.join(__dirname,"..","share","images","logo.png"),path.join(os.homedir(),".local","share","icons","rde-logo.png"));

if(!fs.existsSync(path.join(os.homedir(),".config","fbpanel","rde"))) fs.copySync(path.join(__dirname,"..","config","fbpanel.conf"),path.join(os.homedir(),".config","fbpanel","rde"));

/* Check if the settings are available */
if(!fs.existsSync(paths["SETTINGS"])) fs.copySync(path.join(__dirname,"..","config"),paths["SETTINGS"]);

/* Check if the share is installed */
fs.copySync(path.join(__dirname,"..","share"),paths["SHARE"]);

/* Load settings */
var cfg = JSON.parse(fs.readFileSync(path.join(paths["SETTINGS"],"rde.json")).toString());
var theme = new Theme(cfg["theme"]);

process.env["GTK_THEME"] = "Nordic";
if(theme.info.overrides.indexOf("gtk") > -1) process.env["GTK_THEME"] = theme.info.gtkTheme;

theme.init();

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
		var wallpaper = cfg["wallpaper"];
		theme = new Theme(cfg["theme"]);
		if(theme.info.overrides.indexOf("wallpaper") > -1) wallpaper = path.join(theme.path,"images",theme.info.images["wallpaper"]);
		spawnWrapper(exec("hsetroot -fill "+wallpaper));
		callback();
	});
	serviceIface.update();
}

var wallpaper = cfg["wallpaper"];
if(theme.info.overrides.indexOf("wallpaper") > -1) wallpaper = path.join(theme.path,"images",theme.info.images["wallpaper"]);

var startupPath = "~/.local/share/rde/sounds/startup.wav";
if(theme.info.overrides.indexOf("sounds") > -1 && theme.info.sounds["startup"] != null) startupPath = path.join(theme.path,"sounds",theme.info.sounds["startup"]);

var paconfigPath = "~/.config/rde/pulseaudio.conf";
if(theme.info.overrides.indexOf("pulseaudio") > -1 && theme.info.configs["pulseaudio"] != null) paconfigPath = path.join(theme.path,"config",theme.info.configs["pulseaudio"]);

var conkyPath = "~/.config/rde/conky.conf";
if(theme.info.overrides.indexOf("conky") > -1 && theme.info.configs["conky"] != null) conkyPath = path.join(theme.path,"config",theme.info.configs["conky"]);

var fbpanelProfile = "rde";
if(theme.info.overrides.indexOf("fbpanel") > -1 && theme.info.configs["fbpanel"] != null) fbpanelProfile = theme.info.configs["fbpanel"];

var rdePanelConfig = "/home/spaceboyross/.config/rde/panel.json";
if(theme.info.overrides.indexOf("rde-panel") > -1 && theme.info.configs["rde-panel"] != null) rdePanelConfig = path.join(theme.path,"config",theme.info.configs["rde-panel"]);

var startupPrograms = [
	"gdesklets","paramano","fbpanel --profile "+fbpanelProfile,"rde-panel -c "+rdePanelConfig
];
if(cfg["conky"]) startupPrograms.push("conky --config "+conkyPath);
if(cfg["guake"]) startupPrograms.push("guake");
if(theme.info.overrides.indexOf("startup") > -1 && theme.info.startup != null) startupPrograms = theme.info.startup;

var wm = cfg["wm"];
if(theme.info.overrides.indexOf("wm") > -1 && theme.info.wm != null) wm = theme.info.wm;

/* Start internal services */
require("../services/battery.js");

/* Start the desktop environment */
spawnWrapper(exec("compton --dbus --backend glx"));
spawnWrapper(exec("twmnd"));
for(var startupProg of startupPrograms) {
	spawnWrapper(exec(startupProg));
}
spawnWrapper(exec("nm-applet"));
spawnWrapper(exec("hsetroot -fill "+wallpaper));
spawnWrapper(exec(wm)).on("exit",() => {
	process.exit();
});
spawnWrapper(exec("pnmixer"));
spawnWrapper(exec("pulseaudio -k"));
spawnWrapper(exec("pulseaudio --start -nC -F "+paconfigPath));
spawnWrapper(exec("play "+startupPath));
