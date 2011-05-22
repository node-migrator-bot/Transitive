var path = require("path");

var defaultOptions = require("./defaults");
var merge = require("./utils/deep_merge");
var connect = require("connect");

var Transitive = function(){
  
};

Tx = {};
Transitive.prototype = Tx;

Tx.Views = require("./views/views");
Tx.Assets = require("./assets");

Tx.boot = function(scope, options){
  if( typeof(options) == "undefined" ){
    options = {};
  }

  this.options = this.loadOptions(options);

  if(this.options.compileTemplates){
    this.Views.compile(options);
  }

  if(this.options.compileBrowserVersions){
    this.Assets.shareWithBrowser(options);
  }

  var directories = this.options.directories;

  //require need relative paths to have ./ in front of them...
  //instead of figuring out if generated is relative, just make it absolute!
  var templateFile = path.resolve(directories.generated + "/templates.js");
  
  this.Views.templates = require(templateFile);

  if(this.options.mixin){
    this.mixin(scope);
  }

  this.createServer(options);
};

Tx.loadOptions = function(options){
  options.mergeDefault = "mergeDefault" in options ? options.mergeDefault : true;
  
  if(options.mergeDefault){
    options = merge(options, defaultOptions);
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
};

Tx.mixin = function(scope) {
  var mix = "fs sys connect".split(" ");
  mix.forEach(function(e){
    scope[e] = require(e);
  });
};

module.exports = Transitive;