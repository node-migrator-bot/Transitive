module.exports = {
  name: "replace",

  render: function(name, obj){
    return this.render(name, obj); //simple!
  },
  
  tether: function(binding){
    var elm = $('#'+binding.elmId); //speeeeeeeed ;)
    Transitive.router.on(binding.objId, function(data){
      elm.html($templates.render(binding.templateName, data));
    });
  }
}