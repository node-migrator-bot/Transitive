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
  
  // context.renderLive = function(tetherName, templateName, obj){
  //    var data = this.data;
  // 
  //    data.subscribe.push(obj.id);
  //    data.objectsReferenced[obj.id] = obj;
  // 
  //    var binding = ViewBinding(templateName, obj.id, tetherName); 
  //    data.bindings.push(binding);
  // 
  //    var output = '<div id="'+binding.elmId+'" class="'+tetherName+'">';
  //    output = output + this.live[tetherName].call(this, templateName, obj);
  //    output = output + "</div>";
  //    return output;
  //  };
  
  context.escape = function(text) {
    return (text + "").
      replace(/&/g, "&amp;").
      replace(/</g, "&lt;").
      replace(/>/g, "&gt;").
      replace(/\"/g, "&quot;");
  };
  
  return context;
};