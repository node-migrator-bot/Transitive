var Views = {};

Views.compile = require("./compile");

Views.RenderContext = require("./render_context");

Views.render = function(templateName, locals){
  var rc = new this.RenderContext(this.templates);
  rc.renderLive = function(){ throw "use renderPage if you want to ennable renderLive"; };

  return rc.render(templateName, locals);
};

Views.renderPage = function(templateName, locals, layoutName){
  if(typeof(layoutName) === "undefined"){
    layoutName = "layout";
  }

  var rc = new this.RenderContext(this.templates);
  var content = rc.render(templateName, locals);
  
  //JSON is not valid javascript without the string replacements!
  var etc = JSON.stringify(rc.data)
    .replace('\u2028', '\\u2028')
    .replace('\u2029','\\u2029');

  etc = "$pageData = " + etc;
  
  return rc.render(layoutName, { 
    content: content,
    etc: etc
  });
};

//Views.ViewBinding = require("./view_binding");

module.exports = Views;