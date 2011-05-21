var browserify = require("browserify"),
    fs = require("fs");

var Assets = {};

function bundle(opts){
  return browserify.bundle(opts);
}

Assets.shareWithBrowser = function(options){
  var generated = options.directories.generated;
  var destination = options.directories.generatedPublic;
  
  fs.writeFileSync(destination+"/browserify_base.js", bundle());
};

module.exports = Assets;