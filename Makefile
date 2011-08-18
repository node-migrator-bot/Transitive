apidoc_sources = $(wildcard doc/api/*.md)
apidocs = $(addprefix build/,$(apidoc_sources:.md=.html))

guidedoc_sources = $(wildcard doc/guide/*.md)
guidedocs = $(addprefix build/,$(guidedoc_sources:.md=.html))

diagrams_sources = $(wildcard doc/diagrams/*.dot)
diagrams = $(addprefix build/doc/api/img/,$(subst doc/diagrams/,,$(diagrams_sources:.dot=.png)))

apidoc_dirs = build/doc build/doc/api/ build/doc/api/assets build/doc/api/img
guidedoc_dirs = build/doc build/doc/guide/ build/doc/guide/assets build/doc/guide/img

apiassets = $(subst api_assets,api/assets,$(addprefix build/,$(wildcard doc/api_assets/*)))
guideassets = $(subst guide_assets,guide/assets,$(addprefix build/,$(wildcard doc/guide_assets/*)))

all: test doc

doc: clean_diags html diags

clean_doc:
	rm -rf build/doc/api/*.html
	rm -rf build/doc/assets

clean_guide:
	rm -rf build/doc/guide/*.html
	rm -rf build/doc/assets

$(guidedoc_dirs):
	mkdir -p $@

$(apidoc_dirs):
	mkdir -p $@

magic_values:
	#node tools/dynamic_docs.js

clean_diags:
	rm -rf build/doc/api/img/*

diags: clean_diags $(diagrams)

guide_html: clean_guide $(guidedoc_dirs) $(guidedocs) $(guideassets)

html: clean_doc $(apidoc_dirs) magic_values $(apidocs) $(apiassets)

build/doc/api/%.html: doc/api/%.md
	node tools/doctool.js doc/template.html $< > $@

build/doc/guide/%.html: doc/guide/%.md
	node tools/doctool.js doc/template_guide.html $< > $@

build/doc/api/img/%.png: doc/diagrams/%.dot
	dot $< -Teps > tmp.eps
	convert ps:tmp.eps $@
	rm tmp.eps

build/doc/%:

build/doc/guide/assets/%: doc/guide_assets/% build/doc/guide/assets/
	cp $< $@

build/doc/api/assets/%: doc/api_assets/% build/doc/api/assets/
	cp $< $@

test_files = $(wildcard test/test_*.js)

test:
	node_modules/whiskey/bin/whiskey -t "$(test_files)"
	rm -rf test_temp/*

.PHONY: magic_values test diags