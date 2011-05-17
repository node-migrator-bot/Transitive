var path = require("path");
var find = require('findit').findSync;

var e = {};
module.exports = e;

e.ViewBinding = function(templateName, objId, type){
  return {
    elmId: newId(),
    templateName: templateName,
    objId: objId,
    bindingType: type
  }
};

var filenamesForPaths = function(paths){
  //grab a list of file names that end in .haml in the views/ folder
  var filenames = [];
  if(typeof(paths) == "string"){
    paths = [paths];
  }

  for (var i = paths.length - 1; i >= 0; i--){
    console.log(find(paths[i]))
    filenames = filenames.concat( find(paths[i] ));
  };

  return filenames;
}

e.standard = function(root, options){
  var dirs = options.directories;
  var view_dir = root+"/"+dirs.views.path;
  var Haml = require("haml"); //change this to be smarter!!

  filenames = filenamesForPaths(view_dir);

  var sharedViewsConfig = {
    templateFileNames : filenames,
    sourceToFunction: (function(source) { return Haml(source, false); }),
    filenameToTemplateName : function(filename){
      //let's call the views by their base filename, without the folder or ext
      var name = filename.substr(view_dir.length+1).replace(/\.haml$/, '');
      return name;
    }
  };
  
  options.sharedViewsConfig || ( options.sharedViewsConfig = {});
  userConfig = options.sharedViewsConfig;
  userConfig.sourceToFunction && (sharedViewsConfig.sourceToFunction = userConfig.sourceToFunction);
  userConfig.filenameToTemplateName && (sharedViewsConfig.filenameToTemplateName = userConfig.filenameToTemplateName);


  //do all of the compilation and preparation of templates
  var compiledTemplates = sharedViews.filenamesToTemplates(sharedViewsConfig);
  this.addLiveRenders(compiledTemplates.functions);

  var tethers = this.standardLive(root+"/"+dirs.liveRenders.path, compiledTemplates.functions);
  
  if(process.env["SKIP_GENERATION"] != "true"){
    var generatedDir = root + "/" + dirs.generated.path; 
    var tetherStrings = sharedViews.templateFunctionsToStrings(tethers);
    sharedViews.writeTemplateStrings(generatedDir+ "/tethers.js", "$tethers", tetherStrings);

    var templateStrings = sharedViews.templateFunctionsToStrings(compiledTemplates.functions);  
    sharedViews.writeTemplateStrings(generatedDir + "/templates.js", "$templates", templateStrings);
  }

  return compiledTemplates.functions;
}

e.standardLive = function(userDir, $templates){
  var $tethers = {};
  this.requireLiveUpdates(__dirname+"/live-renders", $templates, $tethers);
  
  if(path.existsSync(userDir)){
    this.requireLiveUpdates(userDir, $templates, $tethers);
  }else{
    console.log("no user live-renders dir found.")
  }

  
  return $tethers;
}

e.RenderContext = function (templates){
  var context = Object.create(templates);
  context.data = {
    subscribe: [],
    objectsReferenced: {},
    bindings: []
  };
  return context;
}


e.addLiveRenders = function($templates){
  $templates.renderLive = function(tetherName, templateName, obj){
    var data = this.data;

    data.subscribe.push(obj.id);
    data.objectsReferenced[obj.id] = obj;

    var binding = ViewBinding(templateName, obj.id, tetherName); 
    data.bindings.push(binding);

    var output = '<div id="'+binding.elmId+'" class="'+tetherName+'">';
    output = output + this.live[tetherName].call(this, templateName, obj);
    output = output + "</div>"
    return output;
  };

  $templates.live || ($templates.live={});
}

e.requireLiveUpdates = function(path, $templates, $tethers){
  var filenames = filenamesForPaths(path);
  var live;
  for (var i = filenames.length - 1; i >= 0; i--){
    live = require(filenames[i]);
    $templates.live[live.name] = live.render;
    $tethers[live.name] = live.tether;
    for(var k in live.templates){
      $templates[k] = live.templates[k];
    }
  };
}

e.renderPage = function(name, locals, layout){
  layout || (layout = 'layout')
  var renderContext = new this.RenderContext($templates);
  var content = renderContext.render(name, locals);
  var etc = JSON.stringify(renderContext.data);

  etc = "$pageData = " + etc;

  return renderContext.render(layout, { 
    content: content,
    etc: etc
  });
};

var templates = e.templates;