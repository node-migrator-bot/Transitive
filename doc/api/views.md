## Views

Views are the combination of [Templates](#templates), [LiveRenders](#liveRender) and a [RenderContext](#renderContext).  The server compiles your [Templates](#templates) during the [Boot](boot.html) process.  Normally, you will create your own Templates and LiveRenders by creating files in the [appropriate folders](options.html), and will interact with your views through [Transitive.Views](#transitive.Views).

### Templates
By default, templates reside in options.root + "/templates"

#### compilation

Templates are compiled by [Shared-Views](http://github.com/aaronblohowiak/shared-views) and written to a node-compatible module file in `options.directories.generated` named `template.js`.  Filenames are converted to template names by removing the template folder path and the file extension from the file name.  For instance, you'd render "/var/www/example.com/templates/user/profile.haml" by calling `render("user/profile", user)`.  There is *no support* for relative view names.  

Templates are converted to functions using a `template engine` (haml, underscore, etc.) We pick the template engine based on the file extension.

#### engines

By default, Transitive supports [Haml-js](http://github.com/creationix/haml-js) with `escapeHtmlByDefault` set to `true` and a custom html escaping function.  Transitive supports [underscore](http://documentcloud.github.com/underscore/#template) templates, and finally [markdown](https://github.com/evilstreak/markdown-js) which is useful for content pages.

To provide support for additional engines, add a file extension/rendering function pair to `options.templateEngines`.

Example:

    options.templateEngines["u"] = function(source){
      return require("underscore").template(source);
    }

Engines *MUST* accept the template source and return a function that accepts a locals object and returns html.  The function will be executed with a [RenderContext](#renderContext) as `this`.

### Transitive.Views

#### render(templateName, data)

If called on the client:

`render` creates a RenderContext, and calls its `render(templateName, data)`.  It will return immediately with the html and set up a setTimeout() to process any new [ViewBindings](#viewBinding). 

If called on the server:

`render` will render `templateName` with `data`.  If `templateName` or any sub-templates (partials) call `renderLive`, an error will be thrown.  To render templates with layouts on the server, please use `renderPage`.

#### renderPage(templateName, data, layoutName)
renderPage creates a new RenderContext and uses it to render templateName with data.locals.  It passes the result to 

### LiveRender
By default, LiveRenders are stored in `options.root+"/live-renders"`

Automatic updating is provided by LiveRenders.  Each LiveRender has two functions: `prepare` and `update`.  Each LiveRender must have a unique `name` property.  

To use a LiveRender, call `this.renderLive(name, templateName, data)` in a template.  See the [renderLive](#renderLive) documentation.

Here is an example LiveRender that prepends updates to the top of a DOM element, like you might use for an activity stream or chat room. To prepare the initial html, it renders `templateName` for each item in `data` and returns the resulting html.  When an update is received, it renders `templateName` with the new item and adds this html to the top of the element.

    module.exports = {
      name: "prepend",

      prepare: function(templateName, data){
        var itemsHtml = [];

        for(var i = data.length - 1; i >= 0; i--){
          itemsHtml.push(this.render(templateName, data[i]));
        }

        return itemsHtml.join();
      },
  
      update: function(event){
        this.element.prepend(Transitive.Views.render(this.templateName, event));
      }
    }



#### prepare(templateName, data)

called when the HTML is initially rendered.  At a minimum, you should return the rendered template with the data.  May be called on the server during the initial page load or on the client if the client calls `renderLive`.
    
      prepare: function(templateName, data){
        return this.render(templateName, data);
      }

`this` is the current RenderContext.

#### update(event)

called when the server sends an event about data. modify the current page.

`this` will be a [ViewBinding](#viewBinding)

#### name

The (unique!) name of the LiveRender

### RenderContext
 You should not have to create a RenderContext. It is documented here because it is `this` in a template.  If you would like to render a template and you are **not** already within a template, please use `Transitive.Views.renderPage` or `Transitive.Views.render` if you are on the server or the client, respectively -- these functions will create a RenderContext for you and will handle any resulting [ViewBindings](#viewBinding). 

#### render(templateName, data)
renders `templateName` with the given `data`, returning HTML.

#### renderLive(name, templateName, data)
Gets the LiveRender with the name of `name` and calls it's `prepare(templateName, data)` to get the content. Then, it wraps that content with a new div that has a unique id and a class of `name`. Finally, it creates a new ViewBinding and adds it to `this.bindings`.
  
### ViewBinding
 ViewBindings contain the information that ties together a DOM element, a template and an event handler to a stream of events from the server.  ViewBindings are automatically added to the RenderContext's bindings array when renderLive is called.

 * `elementId`: id of a wrapper div automatically inserted around the output of your `prepare` function
 * `templateName`: the same `templateName` that was passed your `prepare` function
 * `objId`: contains the value of `data.id`
 * `name`: the name of the LiveRender that was called to create this ViewBinding.

On the client, it will also have:

 * `element`: a cached `jQuery('#'+elementId)` for performance

You should not have to create a ViewBinding.  It is documented here as it is the `this` context for a LiveRender's `update` method.
 