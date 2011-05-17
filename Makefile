apidoc_sources = $(wildcard doc/api/*.md)
apidocs = $(addprefix build/,$(apidoc_sources:.md=.html))
apidoc_dirs = build/doc build/doc/api/ build/doc/api/assets
apiassets = $(subst api_assets,api/assets,$(addprefix build/,$(wildcard doc/api_assets/*)))


clean_doc:
	rm -rf build/doc/api/*

$(apidoc_dirs):
	mkdir -p $@
  
doc: clean_doc $(apidoc_dirs) $(apidocs) $(apiassets)

build/doc/api/%.html: doc/api/%.md
	node tools/doctool.js doc/template.html $< > $@

build/doc/%:

build/doc/api/assets/%: doc/api_assets/% build/doc/api/assets/
	cp $< $@