SRC=./src

APPS_SRC=$(SRC)/apps
BUILD_SRC=$(SRC)/build
CONFIGS_SRC=$(SRC)/configs
IMAGES_SRC=$(SRC)/images
NORDIC_SRC=$(SRC)/nordic
START_RDE_SRC=$(SRC)/start-rde

all:
	@echo "Please select a build option"
	@make help

help:
	@echo "Valid build options:"
	@echo "\tinstall - Installs the desktop environment"

include $(BUILD_SRC)/Makefile
