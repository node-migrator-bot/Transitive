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
  
  return context;
};