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

test:
	testacular start test/learning/testacular.conf.js --single-run=true

test_forever:
	testacular start test/learning/testacular.conf.js

clean:
	rm -fr build coverage

.PHONY: all test test_forever clean
