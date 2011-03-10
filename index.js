var templates = require('./templates');

var Transitive = function(){};

Tx={};
Transitive.prototype = Tx;

//Refactor to be a proper constructor.
Tx.boot = function(obj, options){
  this.mixin(obj);
  
  obj["$templates"] = templates.standard(options.root);

  obj.server = connect.createServer(
    connect.staticProvider(options.root + '/public')
  );
  
  options.port || (options.port = "3030")
  obj.server.listen(options.port);

  options.pi || (options.pi = {});
  obj.pi = new PushIt(server, options.pi);
}

Tx.mixin = function (obj){
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
  obj.render = templates.render;
}

module.exports = Transitive;