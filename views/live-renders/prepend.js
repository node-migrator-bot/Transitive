module.exports = {
  name: "prepend",

  render: function(name, obj){
    var output='';

    for(var i = obj.length - 1; i >= 0; i--){
      output = output + this.render(name, obj[i]);
    }

    return output;
  },
  
  tether: function(binding){
    var elm = $('#'+binding.elmId); //zooooom
    Transitive.router.on(binding.objId, function(data){
      elm.prepend($templates.render(binding.templateName, data));
    });
  }
}