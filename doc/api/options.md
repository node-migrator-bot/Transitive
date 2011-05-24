## Options

  * Explain how options work
  * Show example of loading default options and overriding before boot.

### directories
  
  * templates
  * public - auto-served
  * generated
  * generatedPublic - auto-served
  
### compileViews

true - should the compile step write out a template to `options.generated + "/templates.js"` ?

### compileBrowserVersions

true - compile browser versions of everything in generated, and put into options.generatedPublic

### mixin

true - mixin common packages into the scope passed to `boot`.

### server

[new server] - create your own `connect` server.  You'll want to do this if you want to use SSL.

### templateEngines

an Object where the keys are file extensions and the properties are functions that accept `(source, filename)` and return a `function(locals) `that returns HTML when called