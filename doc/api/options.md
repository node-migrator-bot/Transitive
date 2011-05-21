### directories
  
  * templates
  * public - auto-served
  * generated
  * generatedPublic - auto-served
  
### writeTemplates

boolean - should the compile step write out a template to `options.generated + "/templates.js"` ?

### compileBrowserVersions

true - compile browser versions of everything in generated, and put into options.generatedPublic

### server

create your own `connect` server.  You'll want to do this if you want to use SSL.

### templateEngines

an Object where the keys are file extensions and the properties are functions that accept `(source, filename)` and return a `function(locals) `that returns HTML when called