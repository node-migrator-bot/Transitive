var ViewBinding = require("./view_binding");

module.exports = RenderContext = function (templates){
  var context = Object.create(templates);
  context.data = {
    subscribe: [],
    objectsReferenced: {},
    bindings: []
  };
  
  context.render = function(templateName, locals){
    return this[templateName](locals);
  };
  
  context.renderLive = function(liveRenderName, templateName, obj){
    var data = this.data;
 
    var binding = ViewBinding(templateName, obj.id, liveRenderName); 
    data.bindings.push(binding);
    
    data.subscribe.push(obj.id.toString());
    data.objectsReferenced[obj.id.toString()] = obj;
    
    var output = '<div id="'+binding.elmId+'" class="'+liveRenderName+'">';
    output = output + this.liveRenders[liveRenderName].prepare.call(this, templateName, obj);
    output = output + "</div>";
    return output;
  };
  
  context.escape = function(text) {
    return (text + "").
      replace(/&/g, "&amp;").
      replace(/</g, "&lt;").
      replace(/>/g, "&gt;").
      replace(/\"/g, "&quot;");
  };

  return context;
};