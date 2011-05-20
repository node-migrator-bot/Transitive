var fs = require("fs"),
    find = require("findit").findSync,
    _ = require("underscore"),
    sharedViews = require("shared-views"),
    path = require("path");
    
function compile(options){
  var viewDir = (options.root + "/" + options.directories.templates);
  console.log(viewDir);
  var config = {};
  
  config.templateFileNames = compile.filenamesForPaths(viewDir);
  
  console.log(config.templateFileNames);
  
  config.sourceToFunction = function(source, filename){
    var ext = path.extname(filename).substr(1);
    return options.templateEngines[ext](source, filename);
  };
  
  config.filenameToTemplateName = function(filename){
    filename = filename.replace(/\.[^.]*$/, '');
    return filename.substr(viewDir.length + 1);
  };
  
  return sharedViews.filenamesToTemplates(config).functions;
}


compile.filenamesForPaths = function(paths){
  var filenames = [];
  if(typeof(paths) == "string"){
    paths = [paths];
  }

  for (var i = paths.length - 1; i >= 0; i--){
    filenames = filenames.concat( find(paths[i] ));
  }

  filenames = _.select(filenames, function(name){
    return fs.statSync(name).isFile();
  });

  return filenames;
};

module.exports = compile;