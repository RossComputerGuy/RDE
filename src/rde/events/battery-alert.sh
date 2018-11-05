#!/bin/bash

if [ `acpi -b | awk ' { print ($3)}'`  == "Discharging," ] ; then
    # Discharging
    # Monitor for low battery
    if [ `acpi -b | awk ' { print ($4)-0}'`  -le "15" ] ; then
    	if [ $DISPLAY ]; then notify-send -u critical -t 2000 "Battery Critically Low" "Plug in to AC or Suspend immediately" ; fi
        pactl set-sink-volume 0 75\% && pactl set-sink-mute 0 0 && play /etc/rde/sounds/events/battery-low.wav ;
    fi
else
    # Charging
    if [ `acpi -b | awk ' { print ($4)-0}'`  -eq "100" ] ; then
        # Fully charged
    	if [ $DISPLAY ]; then notify-send -u critical -t 2000 "Battery Fully Charged" "Charger can be unplugged now" ; fi
        pactl set-sink-volume 0 75\% && pactl set-sink-mute 0 0 && play /etc/rde/sounds/events/battery-full.wav ;
    fi
fi
