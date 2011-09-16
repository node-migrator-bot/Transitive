require("./jquery"); //currently, pollutes global scope!
require("./sockjs.min.js"); //currently, pollutes global scope!

var EventEmitter = require('events').EventEmitter;
var PushIt = require("./push-it.js").PushIt;

Transitive = new EventEmitter();

Transitive.Views = {};

Transitive.Views.RenderContext = require("./render_context.js");

Transitive.Views.render = function(templateName, scope){
  var rc = new this.RenderContext(this.templates);
  var html = rc.render(templateName, scope);

  for (var i = rc.data.bindings.length - 1; i >= 0; i--){
    initViewBinding(rc.data.bindings[i]);
  }
  
  for (var j = rc.data.subscribe.length - 1; j >= 0; j--){
    Transitive.pushIt.subscribe(rc.subscribe[j]);
  }
  
  return html;
};

Transitive.boot = function(){
  var elm, binding, self=this;
  for(i=0, l = $pageData.bindings.length; i < l; i++){
    initViewBinding($pageData.bindings[i]);
  }
  
  this.pushIt = new PushIt({
    hostname: document.domain,
    channels: $pageData.subscribe
  });

  this.pushIt.onMessageReceived = function(message){
    Transitive.emit(message.channel, message.data);
  };
};

function initViewBinding(viewBinding) {
  var liveRender = Transitive.Views.templates.liveRenders[viewBinding.liveRenderName];

  viewBinding.element = $(document.getElementById(viewBinding.elmId));
  
  if(liveRender.hasOwnProperty("init")){
    liveRender.init.call(viewBinding, $pageData.objectsReferenced[viewBinding.objId]);
  }
  
  Transitive.on(viewBinding.objId, function(data){
    liveRender.update.call(viewBinding, data);
  });
}
module.exports = Transitive;