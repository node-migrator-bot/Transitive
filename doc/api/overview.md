## Overview

Transitive has two key features:

  * Broadcasting data
  * Live Renders

Additionally, Transitive provides:

  * Reasonable Defaults
  * Limited Scope
  * Customizeability

### Key Features

#### Broadcasting Data

Broadcasting data is the ability for your persistence layer to emit events when your data changes.  Transitive provides a very thin wrapper around [Push-It](http://github.com/aaronblohowiak/Push-It)

#### Live Renders
LiveRenders update the DOM when there is an update to the data. [LiveRender documentation](views.html#liveRender) 

Calling a "publish" function when your data changes is easy.  Updating the DOM when you know the data has changed is a lot harder.  Transitive provides a lot of support for updaters.

### Additional Benefits

#### Reasonable Defaults

Transitive provides example broadcasting datastores (backed by redis) and example render updaters (replace, prepend, addRemove), but you should consider these examples and feel free to implement your own once you have a basic understanding of the system.

#### Limited Scope

Transitive *does not* provide an ORM, permissions framework, django_admin-style interface or complex controller/router.  These things are welcome as plugins, and I am more than happy to provide support for anyone interested in building such things.

#### Customizeability

The events your data broadcasts and the kinds of updates you'd like to make are both very application specific, so every effort has been made to streamline the process of creating custom broadcasting data stores and render updaters.  Transitive provides the structure and framework so you can focus on your application-specifc code

I'd like to support an explicit plugin system soon.  If you have ideas about this, or would like to pitch in, please email me.

