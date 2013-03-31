# Argumenta Widgets Makefile
# Uses node and require.js to optimize JS & CSS sources.

OPTIMIZE ?= uglify
RJS := ./node_modules/requirejs/bin/r.js

all: build

build: public coverage

public: optimize

optimize: assets
	$(RJS) -o assets/js/app.build.js optimize=$(OPTIMIZE)

assets:

test:
	testacular start test/testacular.conf.js --single-run=true

test_forever:
	testacular start test/testacular.conf.js

coverage:
	testacular start test/coverage.conf.js

clean:
	rm -fr build coverage

.PHONY: all test test_forever coverage clean
