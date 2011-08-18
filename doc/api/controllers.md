## Controllers


Transitive provides support for `controllers` as a matter of code organization and convenience.

Controllers are just collections of routes and their handlers.

#### Example Controller

    module.exports = function(routes, Transitive){
      routes.get("/", function(req, res){
        res.writeHead(200, { 
          'Content-Type': 'text/html', 
          'Cache-Control': 'no-cache, no-store'
        });

        res.end(Transitive.Views.renderPage("home", {}));
      });
    };

This controller supports a single route, `GET: /` and renders the `home` page without any locals using the default layout, named `layout`. `Transitive` will be an instance of Transitive that has booted.

### registerController(fn)

`fn` is a function that accepts `routes, Transitive`.  `routes` will be a `connect.router` routes object.

### Disabling Controller auto-require

Use the 