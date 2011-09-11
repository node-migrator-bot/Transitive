var fs = require("fs"),
    find = require("findit").findSync,
    _ = require("underscore"),
    sharedViews = require("shared-views"),
    path = require("path");

function compile(options){  
  var templates = compileTemplates(options);

  var liveRenders = compileLiveRenders(options, templates);
  templates.liveRenders = liveRenders;
  
  if(options.writeTemplates){
    compile.write(templates, options.directories.generated);
  }

  return templates;
}

function compileTemplates(options){
  var viewDir = (options.root + "/" + options.directories.templates);

  var config = {
    templateFileNames: compile.filenamesForPaths(viewDir),
    sourceToFunction: function(source, filename){
      var ext = path.extname(filename).substr(1);
      return options.templateEngines[ext](source, filename);
    },
    filenameToTemplateName: function(filename){
      filename = filename.replace(/\.[^.]*$/, '');
      return filename.substr(viewDir.length + 1);
    }
  };
  
  return sharedViews.filenamesToTemplates(config).functions;
}

function compileLiveRenders(options, templates){
  
  function ensureDir(dirname){
    if(!require("path").existsSync(dirname))
      fs.mkdirSync(dirname, "7777");
  }
  
  for (var i = options.directories.liveRenders.length - 1; i >= 0; i--){
    ensureDir(options.directories.liveRenders[i]);
  }
  
  var filenames = compile.filenamesForPaths(options.directories.liveRenders);
    
  var liveRender;
  var liveRenders = {};

  var cwd = process.cwd();
//  process.chdir(options.directories.liveRenders);
  
  _.forEach(filenames, function(filename){
    filename = path.resolve(filename);
    liveRender = require(filename);
    liveRenders[liveRender.name] = liveRender;
    addLiveRenderTemplatesToMainTemplates(templates, liveRender.templates, filename);
  });
  
  process.chdir(cwd);
  return liveRenders;
}

function addLiveRenderTemplatesToMainTemplates(templates, liveRenderTemplates, filename){
  for(var templateName in liveRenderTemplates){
    if(liveRenderTemplates.templates.hasOwnProperty(templateName)){
      if(templateName in templates){
        throw("Template conflict: " + templateName+" in "+filename+" would override an existing template. Aborting.");
      }
      templates[templateName] = liveRenderTemplates.templates[templateName];
    }
  }
}

compile.write = function(functions, dir){
  dir = require("path").resolve(dir);
  
  if(!require("path").existsSync(dir))
    fs.mkdirSync(dir, "7777");
    
  sharedViews.writeTemplateStrings(dir+ "/templates.js", "module.exports", functions);
};

compile.filenamesForPaths = function(paths){
  if(typeof(paths) == "string"){
    paths = [paths];
  }
  //get all of the files within a directory, recursively
  var filenames = _(paths).chain()
      .map(function(path){ return find(path); })
      .flatten()
      .reduce(function(filenames, name){
        if(fs.statSync(name).isFile())
          filenames.push(name);
        return filenames;
      }, []).value();

  return filenames;
};

module.exports = compile;