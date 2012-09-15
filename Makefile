# Argumenta Widgets Makefile
# Uses node and require.js to optimize JS & CSS sources.

OPTIMIZE ?= uglify
RJS := ./node_modules/requirejs/bin/r.js

all: build

build: public

public: optimize

optimize: assets
	$(RJS) -o assets/js/app.build.js optimize=$(OPTIMIZE)

assets:

clean:
	rm -fr build

.PHONY: all clean
