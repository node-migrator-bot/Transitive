var browserify = require("browserify"),
    fs = require("fs");

var Assets = {};

function bundle(opts){
  return browserify.bundle(opts);
}

function wrap(name, options){
  return browserify.wrap(name, options);
}

Assets.shareWithBrowser = function(options){
  var generated = options.directories.generated;
  var destination = options.directories.generatedPublic;
  
  
  str = browserify.bundle({base : __dirname + '/../browser'});
  
  fs.writeFileSync(destination+"/transitive.js", str);
  
  //i cant figure out a cleaner way to do this.
  
  var cwd = process.cwd();
  process.chdir(generated);
  var str = wrap("./templates.js");
  process.chdir(cwd);
  
  fs.writeFileSync(destination+"/templates.js", str.source);
};

module.exports = Assets;