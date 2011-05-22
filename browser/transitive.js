Transitive = {};

Transitive.Views = {};

Transitive.Views.RenderContext = require("./render_context.js");

Transitive.Views.render = function(templateName, scope){
  var rc = new this.RenderContext(this.templates);
  var html = rc.render(templateName, scope);
  //TODO: handle rc.data
  return html;
};

module.exports = Transitive;