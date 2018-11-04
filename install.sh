#!/bin/sh

if [[ $EUID -ne 0 ]]; then
	echo "This script must be run as root" 
	exit 1
fi

cp start-rde /usr/local/bin/start-rde
cp -r Nordic /usr/share/themes/
cp images/arch-linux.png /usr/share/fbpanel/images/
cp images/wallpaper.jpg /etc/rde/wallpaper.jpg
mkdir -p /etc/rde
cp -r configs /etc/rde/
