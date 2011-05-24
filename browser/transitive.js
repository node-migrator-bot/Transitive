var EventEmitter = require('events').EventEmitter;

Transitive = new EventEmitter();

Transitive.Views = {};

Transitive.Views.RenderContext = require("./render_context.js");

Transitive.Views.render = function(templateName, scope){
  var rc = new this.RenderContext(this.templates);
  var html = rc.render(templateName, scope);
  //TODO: handle rc.data
  return html;
};

function initViewBinding(viewBinding) {
  viewBinding.element = $(viewBinding.elmId);
  this.on(viewBinding.objId, function(data){
    Transitive.templates.liveRenders[viewBinding.liveRenderName].update.call(binding, data);
  });
}

Transitive.boot = function(){
  var elm, binding, self=this;
  for(i=0, l = $pageData.bindings.length; i < l; i++){
    initViewBinding($pageData.bindings[i]);
  }
};

module.exports = Transitive;