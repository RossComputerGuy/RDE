install:
	@if test `whoami` != "root" ; \
	then \
		echo "This script must be run as root" ;\
		exit 1 ;\
	fi
	@echo "Installing start-rde"
	@cp $(START_RDE_SRC)/start-rde /usr/local/bin/start-rde
	@echo "Installing GTK theme"
	@cp -r $(NORDIC_SRC)/* /usr/share/themes/Nordic/
	@echo "Installing images"
	@cp $(IMAGES_SRC)/arch-linux.png /usr/share/fbpanel/images/
	@mkdir -p /etc/rde
	@cp $(IMAGES_SRC)/wallpaper.jpg /etc/rde/wallpaper.jpg
	@echo "Installing configs"
	@cp -r $(CONFIGS_SRC)/* /etc/rde/configs/
