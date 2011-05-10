var templates = require('./templates/templates'),
    models = require('./models/models'),
    collections = require('./collections/collections'),
    directories = require("./magic_values/directories"),
    querystring = require("querystring");

var Transitive = function(){};

Tx={};
Transitive.prototype = Tx;

//Refactor to be a proper constructor.
Tx.initialize = function(obj, options){
  this.mixin(obj);

  obj["$templates"] = templates.standard(options.root, {
    directories: directories,
    sharedViewsConfig: options.sharedViewsConfig
  });

  obj.server = connect.createServer(
    connect.staticProvider(options.root + '/' + directories.public.path)
  );
  
  options.port || (options.port = "3030");
  obj.server.listen(options.port);
  console.log("Listening on port "+ options.port.toString());

  options.pi || (options.pi = {});
  obj.pi = new PushIt(server, options.pi);
  
  obj.app = {
    posts: [],
    gets: [],
    bufferedPosts: [],
    get: function(path, fn){
      this.gets.push([path, fn]);
    },
    post: function(path, fn){
      this.posts.push([path, fn]);
    },
    bufferedPost: function(path, fn){
      this.bufferedPosts.push([path, fn]);
    },
    success: function(res, page, locals){
      res.writeHead(200, { 
        'Content-Type': 'text/html', 
        'Cache-Control': 'no-cache, no-store'
      });

      res.end(obj.renderPage(page, locals));
    }
  };
  
  obj.app["Gooooooooo!!!"] = function(){
    obj.server.use(connect.router(function(app){
      
      function bufferedPost(path, fn){
        app.post(path, function(req, res){
          req.params.str = '';
          req.on('data', function(d){
            req.params.str = req.params.str + d.toString();
          });

          req.on('end', function(){
            req.post_params = querystring.parse(req.params.str);
            fn(req, res);
          });
        });
      };
      
      var routes = obj.app;
      for (var i = routes.posts.length - 1; i >= 0; i--){
        app.post(routes.posts[i][0], routes.posts[i][1]);
      };
      
      for (var i = routes.gets.length - 1; i >= 0; i--){
        app.get(routes.gets[i][0], routes.gets[i][1]);
      };
      
      for (var i = routes.bufferedPosts.length - 1; i >= 0; i--){
        bufferedPost(routes.bufferedPosts[i][0], routes.bufferedPosts[i][1]);
      };
    }));
  }
}

//shove a bunch of useful stuff into the scope provided.
Tx.mixin = function (obj){
  obj.Models = models;
  obj.Collections = collections;
  obj.sharedViews = require('shared-views');
  obj.connect = require("connect");
  obj.PushIt = require("push-it").PushIt;
  obj.newId = require("uuid-pure").newId,
  obj.fs = require("fs");
  obj.sys = require("sys");
  obj._ = require("underscore")._;
  obj.u = obj._;
  obj.ViewBinding = templates.ViewBinding;
  obj.RenderContext = templates.RenderContext;
  obj.renderPage = templates.renderPage;
}

module.exports = Transitive;