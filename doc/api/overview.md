## Overview

![Transitive concept](img/concept.png)

When a user sends a change to the server, that change is automatically pushed out to other users.

Transitive provides a framework to help you build these kind of "real-time" applications.

Transitive has two key features:

  * BroadcastingData
  * LiveRender

Additionally, Transitive provides:

  * Reasonable Defaults
  * Customizability
  * Limited Scope

### Key Features

 BroadcastingData lets everybody who cares see when something changes. Live Renders keep the browser's view up to date as the data changes.

#### BroadcastingData

![Transitive concept](img/broadcasting_data.png)

Broadcasting data is the ability for your persistence layer to emit events when your data changes.  Transitive provides a very thin wrapper around [Push-It](http://github.com/aaronblohowiak/Push-It).  When you save an object, the persistence layer publishes a message to a channel.  The channel name matches the object's id.  It is easy to wrap or extend most database adapters to have this functionality. [BroadcastingData documentation](persistence.html#broadcasting_Data).

#### Live Renders

LiveRenders update the DOM when there is an update to the data. [LiveRender documentation](views.html#liveRender) 

### Additional Benefits

#### Reasonable Defaults

Transitive provides an example BroadcastingData store (backed by redis) and example LiveRenders (replace, prepend, addRemove), but you should consider these examples and feel free to implement your own once you have a basic understanding of the system.  In [The Guide](http://transitive.io/guide.html) we create a custom `BroadcastingData` store and a custom `LiveRender`, so you can get on your way to building tricked-out realtime awesomeness.

#### Customizability

The events your data broadcasts and the kinds of updates you'd like to make are both very application specific, so every effort has been made to streamline the process of creating custom BroadcastingData stores and LiveRenders.  Transitive provides the structure and framework so you can focus on your application-specific code.  Transitive determines the flow, you fill in the good bits.

The default configuration is pretty good, but you may need to [customize it](options.html).

I'd like to support an explicit plugin system soon.  If you have ideas about this, or would like to pitch in, please [email me](mailto:aaron.blohowiak@gmail.com).

#### Limited Scope

Transitive *does not* provide an ORM, permissions framework, django_admin-style interface or complex controller/router.  These things are welcome as plugins, and I am more than happy to provide support for anyone interested in building such things.

### How does it work?

Here, we'll go over how the view gets rendered and updated.  First, we have three diagrams of the process and then an [entity-diagram](#entities) of how the view objects relate to each other. 


#### User requests a page
![Initial Render](img/page_render.png)
 
 * [Views](views.html) - overview of how views are constructed
 * [Templates](views.html#templates) - functions that turn data into html
 * [LiveRenders](views.html#liveRender) - updates the page when data changes
 * [ViewBindings](views.html#viewBinding) - connects events to updaters and divs
 * [RenderContext](views.html#renderContext) - orchestrates the creation of a page by passing data through a template and collecting the ViewBindings that result.

#### The page loads in the browser
![Page Loads] (img/page_load.png)

 * [Push-It](http://github.com/aaronblohowiak/Push-It)

#### The Data Changes
![Data changes] (img/live_render.png)

#### Entities

If you are into entity diagrams, this should explain how the view objects are related.  Most of these relationships are automatic or implicit, and ViewBindings are created automatically when you call a LiveRender from a template.

![Transitive view objects](img/view_objects.png)

