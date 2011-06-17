//System Libraries
var path = require("path");

//External Libraries
var connect = require("connect");
var PushIt = require("push-it").PushIt;

//Internal Utils
var defaultOptions = require("./defaults");
var merge = require("./utils/deep_merge");

var Transitive = function(){
  
};

Tx = {};
Transitive.prototype = Tx;

Tx.Views = require("./views/views");
Tx.Assets = require("./assets");

Tx.boot = function(scope, options){
  if( typeof(options) === "undefined" ){
    options = {};
  }

  this.options = this.loadOptions(options);

  if(this.options.compileViews){
    this.Views.compile(options);
  }

  if(this.options.compileBrowserVersions){
    this.Assets.shareWithBrowser(options);
  }

  this.loadTemplates(this.options);
  
  if(this.options.mixin){
    this.mixin(scope);
  }

  if(this.options.createServer){
    this.createServer(options);
  }
};

Tx.loadTemplates = function(options){
  var folder = options.directories.generated;
  //require need relative paths to have ./ in front of them...
  //instead of figuring out if generated is relative, just make it absolute!
  var templateFile = path.resolve(folder+ "/templates.js");
  
  this.Views.templates = require(templateFile);
  
  return this.Views.templates;
};

//note that this mutates defaultOptions if mergeDefault is true.
Tx.loadOptions = function(options){
  options.mergeDefault = "mergeDefault" in options ? options.mergeDefault : true;
  
  if(options.mergeDefault){
    options = merge(defaultOptions, options); 
  }
  
  if(!options.root){
    options.root = process.cwd();
  }

  return options;
};

Tx.createServer = function(options){
  if(options.server){
    this.server = options.server;
  }else{
    this.server = connect();
  }

  this.server.use(connect.static(options.directories.public));
  this.server.use(connect.static(options.directories.generatedPublic));
  this.pushIt = new PushIt(this.server, options.pushIt);
  this.server.listen(this.options.port );
};

Tx.mixin = function(scope) {
  var mix = "fs sys connect".split(" ");
  mix.forEach(function(e){
    scope[e] = require(e);
  });
};

module.exports = Transitive;