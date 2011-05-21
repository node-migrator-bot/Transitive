## Overview

![Transitive concept](img/concept.png)

When a user sends a change to the server, that change is automatically pushed out to other users.

Transitive provides a framework to help you build these kind of "real-time" applications.

Transitive has two key features:

  * Broadcasting data
  * Live Renders

Additionally, Transitive provides:

  * Reasonable Defaults
  * Customizeability
  * Limited Scope

### Key Features

 Updating the DOM when you know the data has changed is a lot harder.  Transitive provides a lot of support for the template rendering and updating process through [LiveRenders](views.html#liveRender).

#### Broadcasting Data

![Transitive concept](img/broadcasting_data.png)

Broadcasting data is the ability for your persistence layer to emit events when your data changes.  Transitive provides a very thin wrapper around [Push-It](http://github.com/aaronblohowiak/Push-It).  When you save an object, the persistence layer publishes a message to a channel.  The channel name matches the object's id.  It is easy to wrap or extend most database adapters to have this functionality. [BroadcastingData documentation](persistence.html#broadcasting_Data).

#### Live Renders

LiveRenders update the DOM when there is an update to the data. [LiveRender documentation](views.html#liveRender) 

### Additional Benefits

#### Reasonable Defaults

Transitive provides example broadcasting data stores (backed by redis) and example render updaters (replace, prepend, addRemove), but you should consider these examples and feel free to implement your own once you have a basic understanding of the system.

#### Customizeability

The events your data broadcasts and the kinds of updates you'd like to make are both very application specific, so every effort has been made to streamline the process of creating custom broadcasting data stores and LiveRenders.  Transitive provides the structure and framework so you can focus on your application-specifc code

I'd like to support an explicit plugin system soon.  If you have ideas about this, or would like to pitch in, please email me.

#### Limited Scope

Transitive *does not* provide an ORM, permissions framework, django_admin-style interface or complex controller/router.  These things are welcome as plugins, and I am more than happy to provide support for anyone interested in building such things.

### How does it work?

#### User requests a page:
![Initial Render](img/page_render.png)
 
 * [Views](views.html)
 * [Templates](views.html#templates)
 * [ViewBindings](views.html#viewBinding)
 * [RenderContext](views.html#renderContext)


#### The page loads in the browser
![Page Loads] (img/page_load.png)

 * [ViewBindings](views.html#viewBinding)
 * [LiveRender](views.html#liveRender)

#### The Data Changes
![Data changes] (img/live_render.png)

 * [LiveRender](views.html#liveRender)
