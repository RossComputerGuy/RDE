const acpiclient = require("acpiclient");
const { execSync } = require("child_process");
const notifier = require("node-notifier");

setInterval(() => {
	acpiclient((err,data) => {
		if(err) throw err;
		if(data.batteries[0]) {
			// TODO: configurable low battery
			if(data.batteries[0].charge <= 15) {
				// TODO: configurable event
				notifier.notify({
					title: "Battery Low",
					message: "Your battery is low, "+data.batteries[0].charge+"% is remaining",
					sound: true
				});
				execSync("play ~/.local/share/rde/sounds/events/battery-low.wav");
			}
			// TODO: configurable full battery
			if(data.batteries[0].charge >= 90) {
				// TODO: configurable event
				notifier.notify({
					title: "Battery Full",
					message: "Your battery is full",
					sound: true
				});
				execSync("play ~/.local/share/rde/sounds/events/battery-full.wav");
			}
		}
	});
},3600000);
// TODO: configurable delay
