install:
	@if test `whoami` != "root" ; \
	then \
		echo "This script must be run as root" ;\
		exit 1 ;\
	fi
	@echo "Installing start-rde"
	@cp $(START_RDE_SRC)/start-rde /usr/local/bin/start-rde
	@echo "Installing GTK theme"
	@mkdir -p /usr/share/themes/Nordic/
	@cp -r $(NORDIC_SRC)/* /usr/share/themes/Nordic/
	@echo "Installing images"
	@cp $(IMAGES_SRC)/arch-linux.png /usr/share/fbpanel/images/
	@mkdir -p /etc/rde
	@mkdir -p /etc/rde/configs
	@mkdir -p /etc/rde/sounds
	@cp $(IMAGES_SRC)/wallpaper.jpg /etc/rde/wallpaper.jpg
	@echo "Installing configs"
	@cp -r $(CONFIGS_SRC)/* /etc/rde/configs/
	@cp -r $(CONFIGS_SRC)/twmn.conf /etc/twmn.conf
	@echo "Installing sounds"
	@cp -r $(SOUNDS_SRC)/* /etc/rde/sounds/
