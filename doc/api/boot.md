## Initializing Transitive.

Transitive `boot(scope, options)` does four things:

  0. Global Mixins
  1. Views & Assets
  2. Initialize Server 
  3. Setup the router

### Global Mixins

Nobody likes pollution, but we all like convienence.

Here are the items mixed in to the scope passed to initialize:

  ...


### Views & Assets

#### Views:

Sharing views between the server and the client is one of the key strengths of Transitive.  Out of the box, Transitive supports Haml-js and underscore templates.

Transitive views are composed of:

 * Templates - Haml-js, underscore (ejs) or ( mustache ?) by default
 * [LiveRenders](views.html#liveRender) - Event handlers that update the page when your data changes.
 * [RenderContext](views.html#renderContext) & ViewBindings - the glue that makes Templates and LiveRenders work. 

Transitive gathers all of your templates and LiveRenders, compiles them and puts the resulting folder in the "generated" directory. By default, that's in options.root+"/public/generated/".   

On the server, you'll have a `renderPage(templateName, locals, layoutName)` which will return your page, ready to go.  On the client side, you'll have `Transitive.render(templateName, locals)` which will return HTML ready to be inserted in the DOM (and more.. check out [Transitive Views](views.html)

####  Assets:

Transitive makes your compiled views and liveRenders available to the browser using [browserify](https://github.com/substack/node-browserify).

### Initialize Server

Creates a new http server using connect. Adds a connect.staticProvider for the "public" path, options.root+"/public/" by default.  Starts the server listening on options.port, 3030 by default. Initializes Push-It with the server and options.pi. 

### Setup the router

Transitive's router is currently very limited.
