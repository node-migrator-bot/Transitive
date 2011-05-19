apidoc_sources = $(wildcard doc/api/*.md)
apidocs = $(addprefix build/,$(apidoc_sources:.md=.html))

diagrams_sources = $(wildcard doc/diagrams/*.dot)
diagrams = $(addprefix build/doc/api/img/,$(subst doc/diagrams/,,$(diagrams_sources:.dot=.png)))

apidoc_dirs = build/doc build/doc/api/ build/doc/api/assets build/doc/api/img

apiassets = $(subst api_assets,api/assets,$(addprefix build/,$(wildcard doc/api_assets/*)))

clean_doc:
	rm -rf build/doc/api/*

$(apidoc_dirs):
	mkdir -p $@

magic_values:
	#node tools/dynamic_docs.js

doc: clean_doc $(apidoc_dirs) magic_values $(apidocs) $(apiassets) $(diagrams)

build/doc/api/%.html: doc/api/%.md
	node tools/doctool.js doc/template.html $< > $@

build/doc/api/img/%.png: doc/diagrams/%.dot
	dot $< -Teps > tmp.eps
	convert ps:tmp.eps $@
	rm tmp.eps

build/doc/%:

build/doc/api/assets/%: doc/api_assets/% build/doc/api/assets/
	cp $< $@

.PHONY: magic_values