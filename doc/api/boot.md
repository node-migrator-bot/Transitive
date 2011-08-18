## Boot (server).

Transitive `boot(scope, options)` does four things:

  0. Global Mixins
  1. Views & Assets
  2. Initialize Server 
  3. Setup the router

### Global Mixins

Nobody likes pollution, but we all like convienence.

Here are the items mixed in to the scope passed to initialize:

 * `fs` node's `fs` module
 * `sys` node's `sys` module
 * `connect`, a [middleware framework](http://github.com/senchalabs/connect)

### Views & Assets

#### Views:

Sharing views between the server and the client is one of the key strengths of Transitive.  Out of the box, Transitive supports Haml-js and underscore templates.

Transitive views are composed of:

 * [Templates](views.html#templates) - Haml-js (.haml), underscore (.u)  or markdown (.md) by default
 * [LiveRenders](views.html#liveRender) - Event handlers that update the page when your data changes.
 * [RenderContext](views.html#renderContext) & ViewBindings - the glue that makes Templates and LiveRenders work. 

Transitive gathers all of your templates and LiveRenders, compiles them and puts the resulting module in the "generated" directory, and the browser-compatible version in "generatedPublic" directory.  

On the server, you'll call `Transitive.Views.renderPage(templateName, locals, layoutName)` which will return your page, ready to go.  On the client side, you'll have `Transitive.Views.render(templateName, locals)` which will return HTML ready to be inserted in the DOM. Check out the full documentation: [Transitive Views](views.html)

####  Assets:

To facilitate packaging your css and javascript for the browser, Transitive has a simple asset pipeline.

By default, Transitive makes your compiled templates and LiveRenders available to the browser using [browserify](https://github.com/substack/node-browserify).  You can add custom scripts, Less/SCSS/Stylus compilation and minification/concatenation to the asset pipeline so you can minimize the number of requests the browser has to make to load the page in production.

There are simple functions to help you manage the differing needs between development and production, so your code is easier to debug in development, but properly compact in production (of course, this includes supporting asset hosts / CDN.)

[Transitive Asset Management in detail.](assets.html)

### Initialize Server

Creates a new http server using `connect()`. Adds connect.static middleware for "public" and "generatedPublic" [directories](options.html).  
``
Starts the server listening on `options.port`, `3030` by default. Initializes Push-It with the server and options.pi. 

### Setup the router

Transitive's router is currently very limited, using the `connect` router middleware.
