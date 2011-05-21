var defaultOptions = require("./defaults");
var merge = require("./utils/deep_merge");

var Transitive = function(){
  
};

Tx = {};
Transitive.prototype = Tx;

Tx.Views = require("./views/views");

Tx.boot = function(scope, options){
  if( typeof(options) == "undefined" ){
    options = {};
  }

  this.options = this.loadOptions(options);
  
  if(this.options.compileTemplates){
    this.Views.compile(options);
  }

  //this line is crazy long
  this.Views.templates = require(this.options.directories.generated + "/templates.js");
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


module.exports = Transitive;