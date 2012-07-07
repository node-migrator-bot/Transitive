var browserify = require("browserify"),
    fs = require("fs"),
    path = require("path");

var Assets = {};

function bundle(opts){
  return browserify.bundle(opts);
}

function wrap(name, options){
  return browserify.wrap(name, options);
}

Assets.createDirectories = function(dirs){
  for (var i=0; i < dirs.length; i++) {
    if(!fs.existsSync(dirs[i]))
      fs.mkdirSync(path.resolve(dirs[i]), "7777");
  }
};

Assets.shareWithBrowser = function(options){
  var generated = options.directories.generated;
  var destination = options.directories.generatedPublic;

  //i cant figure out a cleaner way to do this. =(
      
  var cwd = process.cwd();
  
  this.createDirectories([generated, destination]);
  
  str = browserify.bundle({
    base : path.resolve(__dirname + '/../browser')
  });
  
  process.chdir(path.dirname(require.resolve("push-it"))+"/../client/");  
  str += wrap("./push-it.js").source;
  process.chdir(cwd);
  
  fs.writeFileSync(destination+"/transitive.js", str);
  
  process.chdir(generated);
  var str = wrap("./templates.js").source;
  process.chdir(cwd);
  
  fs.writeFileSync(destination+"/templates.js", str);
};

module.exports = Assets;