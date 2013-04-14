# Argumenta Widgets Makefile

OPTIMIZE ?= uglify
RJS := ./node_modules/requirejs/bin/r.js
KARMA := ./node_modules/.bin/karma

all: build coverage

build: public links

links:
	ln -sf -T 'assets/' development
	ln -sf -T 'build/public/' production

public: optimize

optimize: assets
	$(RJS) -o assets/js/app.build.js optimize=$(OPTIMIZE)

assets:

test:
	$(KARMA) start test/config/karma.conf.js --single-run=true

test_forever:
	$(KARMA) start test/config/karma.conf.js

coverage:
	$(KARMA) start test/config/coverage.conf.js --browsers="Chrome"

clean:
	rm -fr build coverage

.PHONY: all links test test_forever coverage clean
