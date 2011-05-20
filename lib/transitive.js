var defaultOptions = require("lib/default");
var merge = require("lib/utils/merge");

var Transitive = function(){
  
};

Tx = {};
Transitive.prototype = Tx;

Tx.Views = require("./views/views");

Tx.boot = function(options){
  options || (options = {});
  this.options = this.loadOptions(options);
  
}

Tx.loadOptions = function(options){
  options.mergeDefault = "mergeDefault" in options ? options.mergeDefault : true
  if(options.mergeDefault){
    options = merge(options, defaultOptions);
  }
  
  return options;
}


module.exports = Transitive;