## Options

Configuration management is annoying.  We can use configuration to customize the behavior of Transitive, and to vary the behavior based on different execution contexts (dev vs staging vs prod, web server vs worker process, et cetera.)

Transitive provides some help to make configuration management easier:

  1. Every option is documented here.
  2. Every option can be over-ridden.
  3. Almost every option can be overridden from the command line.
  4. It is trivial to have your application dump its configuration on boot.

## Defaults

### compileBrowserVersions

true - runs the Asset pipeline to compile browser-ready versions of things like the Transitive browser runtime, templates, and more

### compileViews

true - compiles views in `options.directories.templates` so they are available to the server

Note: if you have pre-compiled your views (for a production deploy) then you may set this to "false" and the views will be read from `options.directories.generated + "/templates.js"`

### createServer

true - create http server, attach Push-It (and Socket.IO.)

### dumpOptions

false - `console.log(sys.inspect(options))` within the boot process so you can inspect the calculated options.

### loadControllers

true - `require` each file in `options.directories.controllers` and pass the function to `Transitive.registerController`

### mergeDefault

true - merge default options onto the custom options passed to Transitive.boot

### mixin

true - mixin common packages into the context passed to `boot`.

### port

3030 - default boot port

### server

[new server] - create a new `connect` server.  Override this if you want to use SSL.

### writeTemplates

true - the compile step writes `options.directories.generated + "/templates.js"`

### directories

  * generated - destination directory for assets that are not served to browser
  * generatedPublic - destination directory for assets generated by Transitive that will be served.
  * public - static assets that will be served relative to the root
  * templates - the root directory for your template files
  * liveRenders - the root directories for your LiveRender definitions

### pushIt

`{}` - these options are passed to the PushIt constructor when the httpServer is created.

### templateEngines

an Object where the keys are file extensions and the properties are functions that accept `(source, filename)` and return a `function(locals) `that returns HTML when called

## Overriding Defaults

Pass custom options to `Transitive.boot(context, options)`

By default, this will merge your options onto the default configuration.  Arrays will be concatenated, objects will be recursively merged, and strings/numbers/bool/functions will be replaced.  To avoid merging with defaults, set `mergeDefault` to `false`.

Sometimes, you don't want to merge all of the defaults or you want to avoid array concatenation.  You can do this by loading up the default options, then customizing the object and passing it to `Transitive.boot`.

Example:

    //load the defaults
    var options = Transitive.loadOptions({});
    //stop defaults from being merged on boot.
    options.mergeDefaults = false; 
    options.templateEngines = myTemplateEnginesObject;
    //now, boot.
    Transitive.boot(this, options);

## Command-Line Overrides


Every Boolean, Number and String option can be over-ridden from the command-line, following the simple pattern: `--name=value`.  For instance, `node server.js --port=80 --compileViews=false` might be used in a production environment.


## Dump Configuration


To have your app dump the computed configurations, start it with `dumpOptions` set to `true`.  The easiest way to force this is from the command line: `node server.js --dumpOptions`

