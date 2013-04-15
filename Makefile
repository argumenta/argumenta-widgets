# Argumenta Widgets Makefile

OPTIMIZE ?= uglify
RJS := ./node_modules/requirejs/bin/r.js
KARMA := ./node_modules/.bin/karma
CLEANCSS := $(abspath ./node_modules/.bin/cleancss)
CSS_DST := $(abspath ./build/public/css)

all: build coverage

build: public links

links:
	ln -sf -T 'assets/' development
	ln -sf -T 'build/public/' production

public: optimize

optimize: assets js css gzip

js:
	$(RJS) -o assets/js/app.build.js optimize=$(OPTIMIZE)

css:
	cd assets/css; \
	CLEAN='$(CLEANCSS) -b "$$1" > "$(CSS_DST)/$${1}"'; \
	find . -name '*.css' -exec bash -c "$$CLEAN" CLEAN '{}' \;

gzip:
	cd build/public; \
	GZIP='gzip -9 -c "$$1" > "$${1}.gz"'; \
	find . -type f -exec bash -c "$$GZIP" GZIP '{}' \;

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
