var templates = require('./templates'),
    models = require('./models'),
    collections = require('./collections'),
    directories = require("./magic_values/directories");

var Transitive = function(){};

Tx={};
Transitive.prototype = Tx;

//Refactor to be a proper constructor.
Tx.boot = function(obj, options){
  this.mixin(obj);
  
  obj["$templates"] = templates.standard(options.root, {
    directories: directories
  });

  obj.server = connect.createServer(
    connect.staticProvider(options.root + '/' + directories.public.path)
  );
  
  options.port || (options.port = "3030");
  obj.server.listen(options.port);

  options.pi || (options.pi = {});
  obj.pi = new PushIt(server, options.pi);
}

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