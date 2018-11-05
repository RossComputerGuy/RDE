SRC=./src

APPS_SRC=$(SRC)/apps
BUILD_SRC=$(SRC)/build
CONFIGS_SRC=$(SRC)/configs
IMAGES_SRC=$(SRC)/images
NORDIC_SRC=$(SRC)/nordic
RDE_SRC=$(SRC)/rde
SERVICES_SRC=$(SRC)/services
SOUNDS_SRC=$(SRC)/sounds

all:
	@echo "Please select a build option"
	@make help

help:
	@echo "Valid build options:"
	@printf "\tinstall - Installs the desktop environment\n"
	@printf "\tuninstall - Removes the desktop environment\n"

include $(BUILD_SRC)/Makefile
