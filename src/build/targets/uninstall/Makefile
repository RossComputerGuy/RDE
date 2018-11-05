uninstall:
	@if test `whoami` != "root" ; \
	then \
		echo "This script must be run as root" ;\
		exit 1 ;\
	fi
	@echo "Removing start-rde"
	@rm /usr/local/bin/start-rde
	@echo "Removing GTK theme"
	@rm -rf /usr/share/themes/Nordic/
	@echo "Removing images"
	@rm /usr/share/fbpanel/images/arch-linux.png
	@rm -rf /etc/rde
	@echo "Removing services"
	@rm /etc/systemd/system/rde_alert_battery.service
	@systemctl disable rde_alert_battery.service
	@echo "Updating systemd"
	@systemctl daemon-reload
